import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] bg-[#EEF5FF] min-h-screen">
      <img src="/images/bg-sidebar-mobile.svg" alt="sidebar-mobile" />
      <div className="transform -translate-y-32 space-y-8">
        <div className="flex justify-center items-center gap-4">
          <a
            href="_"
            className="rounded-full bg-[#BEE2FC] size-8 flex justify-center items-center"
          >
            1
          </a>
          <a
            href="_"
            className="rounded-full border-2 border-white text-white size-8 flex justify-center items-center"
          >
            2
          </a>
          <a
            href="_"
            className="rounded-full border-2 border-white text-white size-8 flex justify-center items-center"
          >
            3
          </a>
          <a
            href="_"
            className="rounded-full border-2 border-white text-white size-8 flex justify-center items-center"
          >
            4
          </a>
        </div>
        <div className="bg-white m-4 rounded-md p-6 max-h-max">
          <p className="font-bold text-2xl text-[#072850]">Personal info</p>
          <p className="text-gray-500">
            Please provide your name, email, address, and phone number.
          </p>
        </div>
      </div>
      <div className="bg-white p-4 flex justify-between items-center">
        <a href="_" className="text-gray-500">
          Go Back
        </a>
        <button
          type="button"
          className="bg-[#04285A] text-white p-4 rounded-lg hover:cursor-pointer hover:bg-[#04285A]/10"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
