import LayoutJsonPlaceholder from 'components/Layout/JsonPlaceholder';

import InternalLink from 'components/Link/Internal';

export const getStaticPaths = async () => {
  let paths = [];

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    paths = users.map((user) => ({
      params: { id: `${user.id}` },
    }));
  } catch (e) {
    console.error(e);
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  let user = {};

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${params.id}`
    );
    user = await res.json();
  } catch (e) {
    console.error(e);
  }

  return {
    props: { user },
  };
};

export const User = ({ user }) => {
  return (
    <LayoutJsonPlaceholder>
      <h1>User: {user.name}</h1>
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
      <hr />
      <InternalLink href="/jsonplaceholder/users">Back</InternalLink>
    </LayoutJsonPlaceholder>
  );
};

export default User;