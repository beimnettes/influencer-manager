import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import BentoCard from './BentoCard';
import { contentIdeasAPI } from '../services/api';
import './KanbanBoard.css';

// Empty columns structure for new users
const emptyColumns = {
    column1: {
        id: 'column1',
        title: 'Spark ✨',
        color: 'var(--creator-gold)',
        itemIds: [],
    },
    column2: {
        id: 'column2',
        title: 'Developing 🎨',
        color: 'var(--creator-blue)',
        itemIds: [],
    },
    column3: {
        id: 'column3',
        title: 'Ready 🚀',
        color: 'var(--creator-pink)',
        itemIds: [],
    },
};

/**
 * KanbanBoard - Drag and drop board for content ideas
 * Fetches real data from API
 */
const KanbanBoard = () => {
    const [columns, setColumns] = useState(emptyColumns);
    const [items, setItems] = useState({});
    const [columnOrder] = useState(['column1', 'column2', 'column3']);
    const [loading, setLoading] = useState(true);

    // Fetch ideas from API
    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                setLoading(true);
                const ideas = await contentIdeasAPI.getAll();

                if (ideas && ideas.length > 0) {
                    // Convert API data to kanban format
                    const newItems = {};
                    const sparkIds = [];
                    const developingIds = [];
                    const readyIds = [];

                    ideas.forEach((idea, index) => {
                        const itemId = `item-${idea.id}`;
                        newItems[itemId] = {
                            id: itemId,
                            title: idea.title,
                            platform: idea.platform || 'Instagram',
                            format: 'Idea',
                            tags: idea.tags || [],
                        };

                        // Distribute ideas across columns (just for demo)
                        if (index % 3 === 0) sparkIds.push(itemId);
                        else if (index % 3 === 1) developingIds.push(itemId);
                        else readyIds.push(itemId);
                    });

                    setItems(newItems);
                    setColumns({
                        column1: { ...emptyColumns.column1, itemIds: sparkIds },
                        column2: { ...emptyColumns.column2, itemIds: developingIds },
                        column3: { ...emptyColumns.column3, itemIds: readyIds },
                    });
                }
            } catch (error) {
                console.error('Error fetching ideas:', error);
                // Keep empty state on error
            } finally {
                setLoading(false);
            }
        };

        fetchIdeas();
    }, []);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        // Moving within same column
        if (start === finish) {
            const newItemIds = Array.from(start.itemIds);
            newItemIds.splice(source.index, 1);
            newItemIds.splice(destination.index, 0, draggableId);

            const newColumn = { ...start, itemIds: newItemIds };
            setColumns({ ...columns, [newColumn.id]: newColumn });
            return;
        }

        // Moving from one column to another
        const startItemIds = Array.from(start.itemIds);
        startItemIds.splice(source.index, 1);
        const newStart = { ...start, itemIds: startItemIds };

        const finishItemIds = Array.from(finish.itemIds);
        finishItemIds.splice(destination.index, 0, draggableId);
        const newFinish = { ...finish, itemIds: finishItemIds };

        setColumns({
            ...columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
        });
    };

    const hasItems = Object.keys(items).length > 0;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-board">
                {columnOrder.map((columnId) => {
                    const column = columns[columnId];
                    const columnItems = column.itemIds.map((itemId) => items[itemId]).filter(Boolean);

                    return (
                        <div key={column.id} className="kanban-column">
                            <div
                                className="column-header"
                                style={{ borderBottomColor: column.color }}
                            >
                                <h3 className="column-title">{column.title}</h3>
                                <span className="column-count">{columnItems.length}</span>
                            </div>

                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        className={`column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {columnItems.length === 0 && !loading && (
                                            <div className="empty-column-hint">
                                                <span className="empty-icon">💡</span>
                                                <span>Drop ideas here</span>
                                            </div>
                                        )}

                                        {columnItems.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`kanban-item ${snapshot.isDragging ? 'dragging' : ''}`}
                                                        style={{ ...provided.draggableProps.style }}
                                                    >
                                                        <div className="item-header">
                                                            <span className={`platform-badge ${item.platform.toLowerCase()}`}>
                                                                {item.platform}
                                                            </span>
                                                            <button className="item-menu">⋮</button>
                                                        </div>
                                                        <h4 className="item-title">{item.title}</h4>
                                                        <div className="item-footer">
                                                            <span className="format-badge">{item.format}</span>
                                                            <div className="item-tags">
                                                                {item.tags.map(tag => (
                                                                    <span key={tag} className="tag-dot" title={tag}></span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}

                                        {/* Add Item Button */}
                                        <button className="add-item-btn">
                                            + Add Idea
                                        </button>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    );
                })}
            </div>

            {/* Empty state for new users */}
            {!hasItems && !loading && (
                <div className="kanban-empty-state">
                    <div className="empty-state-content">
                        <span className="empty-icon">🎨</span>
                        <h3>No ideas yet</h3>
                        <p>Start by adding your first content idea or use AI to generate some!</p>
                    </div>
                </div>
            )}
        </DragDropContext>
    );
};

export default KanbanBoard;
