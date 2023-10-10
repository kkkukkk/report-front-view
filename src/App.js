import './App.css';
import Layout from "./components/common/Layout";
import ReportView  from "./components/reportView/ReportView";

function App() {
  return (
    <div className="App">
      <Layout>
          <ReportView />
      </Layout>
    </div>
  );
}

export default App;
