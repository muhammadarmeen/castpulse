import useSWR from "swr";
import Dashboard from "../components/Dashboard";
import ShareButton from "../components/ShareButton";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/fetchCasts", fetcher, { refreshInterval: 30000 });

  if (error) return <div className="p-4">❌ Failed to load</div>;
  if (!data) return <div className="p-4">⏳ Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">CastPulse</h1>
      <Dashboard data={data} />
      <ShareButton data={data} />
    </div>
  );
}
