import React from 'react';

interface InterviewFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  status: string;
  candidateName: string;
}

export const InterviewFilters: React.FC<InterviewFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState<FilterState>({
    status: 'upcoming',
    candidateName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        name="candidateName"
        placeholder="Search by candidate name"
        value={filters.candidateName}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md"
      />
      
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md"
      >
        <option value="upcoming">Upcoming</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
        <option value="all">All</option>
      </select>
    </div>
  );
}; 