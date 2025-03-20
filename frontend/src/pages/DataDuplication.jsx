import React, { useState } from 'react';

const DataDuplication = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Match Confidence');

  const duplicates = [
    {
      confidence: 95,
      timestamp: '2024-01-15 14:30',
      record1: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567'
      },
      record2: {
        name: 'John A Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567'
      }
    }
  ];

  return (
    <div className="duplicates-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search records..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Sort by Match Confidence</option>
          <option>Sort by Date</option>
          <option>Sort by Name</option>
        </select>
      </div>

      {duplicates.map((duplicate, index) => (
        <div key={index} className="duplicate-card">
          <div className="match-header">
            <div className="flex items-center gap-4">
              <span className={`match-confidence high`}>
                {duplicate.confidence}% Match
              </span>
              <span className="match-timestamp">{duplicate.timestamp}</span>
            </div>
            <div className="action-buttons">
              <button className="btn-merge">Merge</button>
              <button className="btn-ignore">Ignore</button>
              <button className="btn-delete">Delete</button>
            </div>
          </div>

          <div className="records-grid">
            {/* Record 1 */}
            <div>
              <div className="record-field">
                <div className="field-label">Name</div>
                <div className="field-value">{duplicate.record1.name}</div>
              </div>
              <div className="record-field">
                <div className="field-label">Email</div>
                <div className="field-value">{duplicate.record1.email}</div>
              </div>
              <div className="record-field">
                <div className="field-label">Phone</div>
                <div className="field-value">{duplicate.record1.phone}</div>
              </div>
            </div>

            {/* Record 2 */}
            <div>
              <div className="record-field">
                <div className="field-label">Name</div>
                <div className="field-value">{duplicate.record2.name}</div>
              </div>
              <div className="record-field">
                <div className="field-label">Email</div>
                <div className="field-value">{duplicate.record2.email}</div>
              </div>
              <div className="record-field">
                <div className="field-label">Phone</div>
                <div className="field-value">{duplicate.record2.phone}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataDuplication; 