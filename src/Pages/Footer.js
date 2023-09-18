function Footer() {
  return (
    <footer className="w-full max-w-7xl">
      <div className="bg-sky-950 p-10">
        <div className="flex flex-col md:flex-row justify-end gap-8 border-sky-200">
          <div className="text-right">
            <h6 className="text-white font-semibold text-xl mb-2">
              Any Feedback?
            </h6>
            <p className="text-sm text-sky-400 mb-4">
              Add an issue on the{" "}
              <span className="text-white font-bold">
                {" "}
                GitHub Repos
              </span>
            </p>
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-end pt-4 border-t border-sky-700">
          <div className="text-sm text-sky-400 text-right">
            Made by{" "}
              Yu Hao & Ming Zhou.
              All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;