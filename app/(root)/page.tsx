import HeaderBox from "@/components/HeaderBox"; 
import RightSidebar from "@/components/RightSidebar";
import TotalBalance from "@/components/TotalBalance";
import { getLoggedInUser } from "@/lib/actions/user.action";


const Home = async() => {
  const loggedIn = await getLoggedInUser()
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalance
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250.22}
          />
          Transaction
        </header>
      </div>
        <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance:1234.43},{currentBalance:4421.11}]}
        />
    </section>
  );
};

export default Home;
