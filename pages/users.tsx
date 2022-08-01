import { GetServerSideProps, NextPage } from "next";
import api from "../lib/api";

interface IUserProps {
  id: string;
  name: string;
  email: string;
}

function Users(props) {
  return <div>{JSON.stringify(props, null, 2)}</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get("/api/users");

  return {
    props: { data },
  };
};

export default Users;
