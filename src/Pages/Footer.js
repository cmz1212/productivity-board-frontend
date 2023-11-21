export default function Footer() {
  return (
    <footer className="w-full max-w-8xl">
      <div className="bg-white p-6">
        <div className="flex flex-col md:flex-row justify-end gap-8 border-sky-950">
          <div className="text-right">
            <h6 className="text-sky-950 font-semibold text-xl mb-2">
              Any Feedback?
            </h6>
            <p className="text-sm text-sky-950 mb-4">
              Add an issue on the{" "}
              <a
                href="mailto:chua.ming.zhou.1212@gmail.com"
                className="text-sky-950 font-bold"
              >
                {" "}
                GitHub Repos
              </a>
            </p>
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-end pt-3 border-t-2 border-sky-950">
          <div className="text-sm text-sky-950 text-right">
            All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}