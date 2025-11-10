import ProgressBar from "./ProgressBar";

export default function Dashboard({ data }: any) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">📊 Today's CastPulse</h2>

      <ProgressBar label="Casts" value={data.totalCasts} max={10} color="bg-green-500" />
      <ProgressBar label="Likes" value={data.totalLikes} max={50} color="bg-pink-500" />
      <ProgressBar label="Recasts" value={data.totalRecasts} max={20} color="bg-purple-500" />
      <ProgressBar label="Replies" value={data.totalReplies} max={20} color="bg-yellow-500" />

      <div className="text-center my-4 text-xl font-semibold">
        🔥 Score: {data.score} / 100
      </div>
      <div className="text-center my-2">
        📅 Streak: <span className="font-bold">{data.streak} days</span>
      </div>
      <div className="text-center my-2 text-indigo-600 font-semibold">
        🏷️ Title: {data.title}
      </div>
      <div className="text-center italic text-gray-700 mt-4 mb-2">
        💬 {data.motivation}
      </div>
    </div>
  );
}
