import HttpService from '../services/http-service';

const Dashboard = () => {
  const httpService = new HttpService();
  httpService.get('o');
  return <div>Dashboard</div>;
};
export default Dashboard;
