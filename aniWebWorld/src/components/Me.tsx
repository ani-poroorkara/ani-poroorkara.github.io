const Me = () => {
  return (
    <div className="w-[95%] sm:w-full max-w-6xl min-h-[600px] backdrop-blur-md bg-white/5 rounded-xl p-4 sm:p-8 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-white/10 [clip-path:polygon(25%_0%,50%_0%,25%_100%,0%_100%)] hidden sm:block"></div>

      <div className="relative z-10">
        {/* About Me Section */}
        <div className="mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            I'm a passionate developer who loves to create and innovate. With a 
            blend of technical expertise and creative thinking, I bring ideas to life
            through code.
          </p>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Technical Skills</h3>
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium mb-1">Frontend Development</div>
                <div className="text-sm text-white/70">React, TypeScript, Tailwind CSS</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium mb-1">Backend Development</div>
                <div className="text-sm text-white/70">Node.js, Python, SQL</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium mb-1">Tools & Platforms</div>
                <div className="text-sm text-white/70">Git, Docker, AWS</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Interests & Hobbies</h3>
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium mb-1">Photography</div>
                <div className="text-sm text-white/70">Street photography, Landscapes</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium mb-1">Cooking</div>
                <div className="text-sm text-white/70">Indian cuisine, Baking</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium mb-1">Reading</div>
                <div className="text-sm text-white/70">Tech blogs, Science fiction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
          <div className="space-y-4 text-white/90">
            <p className="leading-relaxed">
              Started my coding journey with a curiosity to understand how things work.
              Over the years, I've worked on various projects that have helped me grow
              both technically and personally.
            </p>
            <p className="leading-relaxed">
              Currently focusing on building user-centric applications that make a
              difference in people's lives. Always excited to learn new technologies
              and tackle challenging problems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;