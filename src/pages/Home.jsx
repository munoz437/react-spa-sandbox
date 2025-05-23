import { useContext } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserContext } from '../context/UserContext';
import '../styles/Home.css';


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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Welcome to the React SPA Sandbox!</h1>
        <p className="dashboard-subtitle">User Statistics Overview</p>
      </header>
      
      <div className="charts-grid">
        <div className="chart-container">
          <h2 className="chart-title">User Ages</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={usersWithAge}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  label={{ value: 'Age', angle: -90, position: 'insideLeft' }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar 
                  dataKey="age" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]}
                  name="User Age"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h2 className="chart-title">Age Distribution</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageGroupsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius="80%"
                  innerRadius="60%"
                  dataKey="value"
                >
                  {ageGroupsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} users`, name]}
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend 
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;