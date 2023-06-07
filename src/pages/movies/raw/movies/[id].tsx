import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
 
type Repo = {
  name: string;
  stargazers_count: number;
};
 
export const getServerSideProps: GetServerSideProps<{
  repo: Repo;
}> = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const repo = await res.json();
  return { props: { repo } };
};
 
export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return repo.stargazers_count;
}