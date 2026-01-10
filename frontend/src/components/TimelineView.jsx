import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { postsAPI } from '../services/api';
import './TimelineView.css';

/**
 * TimelineView - Weekly scheduling timeline with drag-drop support
 * Shows time slots, posts for each platform, and best-time indicators
 */
const TimelineView = ({ posts = [], onPostMove }) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = ['09:00', '12:00', '15:00', '18:00', '21:00'];

    const [timelineMap, setTimelineMap] = useState({});
    const [loading, setLoading] = useState(true);

    // Best time heatmap - these are recommendations, not user data
    const bestTimes = {
        'Mon-09:00': true,
        'Wed-18:00': true,
        'Fri-12:00': true,
        'Sun-21:00': true
    };

    // Fetch posts from API and organize by day/time
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const allPosts = await postsAPI.getAll({ status: 'SCHEDULED' });

                if (allPosts && allPosts.length > 0) {
                    const newTimelineMap = {};

                    allPosts.forEach(post => {
                        if (post.scheduledFor) {
                            const date = new Date(post.scheduledFor);
                            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                            const day = dayNames[date.getDay()];
                            const hour = date.getHours();

                            // Map to nearest time slot
                            let timeSlot = '09:00';
                            if (hour >= 20) timeSlot = '21:00';
                            else if (hour >= 17) timeSlot = '18:00';
                            else if (hour >= 14) timeSlot = '15:00';
                            else if (hour >= 11) timeSlot = '12:00';

                            const slotId = `${day}-${timeSlot}`;

                            if (!newTimelineMap[slotId]) {
                                newTimelineMap[slotId] = [];
                            }

                            newTimelineMap[slotId].push({
                                id: post.id,
                                title: post.title,
                                platform: post.platform,
                                type: 'Post'
                            });
                        }
                    });

                    setTimelineMap(newTimelineMap);
                }
            } catch (error) {
                console.error('Error fetching posts for timeline:', error);
                // Keep empty state on error
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const onDragEnd = (result) => {
        // Basic drag handling - to be expanded
        if (!result.destination) return;
        console.log('Moved item to', result.destination.droppableId);
    };

    const hasAnyPosts = Object.keys(timelineMap).length > 0;

    return (
        <div className="timeline-container">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="timeline-header-row">
                    <div className="time-col-header"></div>
                    {days.map(day => (
                        <div key={day} className="day-header">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="timeline-body">
                    {hours.map(hour => (
                        <div key={hour} className="timeline-row">
                            <div className="time-label">{hour}</div>
                            {days.map(day => {
                                const slotId = `${day}-${hour}`;
                                const postsInSlot = timelineMap[slotId] || [];
                                const isBestTime = bestTimes[slotId];

                                return (
                                    <Droppable key={slotId} droppableId={slotId}>
                                        {(provided, snapshot) => (
                                            <div
                                                className={`timeline-slot ${isBestTime ? 'best-time' : ''} ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {isBestTime && !postsInSlot.length && (
                                                    <span className="best-time-icon">⭐</span>
                                                )}

                                                {postsInSlot.map((post, index) => (
                                                    <Draggable key={post.id} draggableId={post.id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={`timeline-card ${post.platform.toLowerCase()}`}
                                                            >
                                                                <span className={`platform-icon-sm ${post.platform.toLowerCase()}`}></span>
                                                                <span className="timeline-card-title">{post.title}</span>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </DragDropContext>

            {/* Empty state overlay for new users */}
            {!hasAnyPosts && !loading && (
                <div className="timeline-empty-overlay">
                    <div className="empty-state-content">
                        <span className="empty-icon">📅</span>
                        <h3>No scheduled posts</h3>
                        <p>Schedule your first post to see it on the timeline. Stars (⭐) show recommended posting times!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

TimelineView.propTypes = {
    posts: PropTypes.array,
    onPostMove: PropTypes.func
};

export default TimelineView;
