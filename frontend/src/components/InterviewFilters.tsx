import React from 'react';

interface InterviewFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  defaultStatus?: string;
}

interface FilterState {
  status: string;
  candidateName: string;
}

export const InterviewFilters: React.FC<InterviewFiltersProps> = ({ 
  onFilterChange, 
  defaultStatus = "upcoming" 
}) => {
  const [filters, setFilters] = React.useState<FilterState>({
    status: defaultStatus,
    candidateName: '',
  });

  React.useEffect(() => {
    // Apply default filters on mount
    onFilterChange(filters);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        name="candidateName"
        placeholder="Search by candidate name"
        value={filters.candidateName}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md w-full md:w-64"
      />
      
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md w-full md:w-48"
      >
        <option value="upcoming">Upcoming</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
        <option value="all">All</option>
      </select>
    </div>
  );
}; 