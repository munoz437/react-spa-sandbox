import { useContext } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserContext } from '../context/UserContext';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Home = () => {
  const { users } = useContext(UserContext);
  
  const usersWithAge = users.map(user => ({
    ...user,
    age: Math.floor(Math.random() * 30) + 20
  }));

  const processAgeGroups = (users) => {
    const ageGroups = [
      { name: '20-29 years', min: 20, max: 29, value: 0, color: '#0088FE' },
      { name: '30-39 years', min: 30, max: 39, value: 0, color: '#00C49F' },
      { name: '40-49 years', min: 40, max: 49, value: 0, color: '#FFBB28' }
    ];
    
    usersWithAge.forEach(user => {
      const ageGroup = ageGroups.find(group => 
        user.age >= group.min && user.age <= group.max
      );
      if (ageGroup) {
        ageGroup.value++;
      }
    });
    
    return ageGroups.filter(group => group.value > 0);
  };

  const ageGroupsData = processAgeGroups(usersWithAge);

  return (
    <div>
      <h1>Welcome to the React SPA Sandbox!</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        
        <div style={{ flex: 1, minWidth: '500px', height: '300px' }}>
          <h2>User Ages</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usersWithAge}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="age" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1, minWidth: '300px', height: '300px' }}>
          <h2>Age Distribution</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ageGroupsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                dataKey="value"
              >
                {ageGroupsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} users`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;