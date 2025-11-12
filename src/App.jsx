import Contacts from "./components/Contacts";
import Layout from "./layout/Layout";
import ContactProvider from "./components/ContactProvider";

function App() {
  return (
    <ContactProvider>
      <Layout>
        <Contacts />
      </Layout>
    </ContactProvider>
  );
}

export default App;
