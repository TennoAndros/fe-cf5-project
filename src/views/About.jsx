const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-5xl font font-semibold text-center my-7">
            About This Project
          </h1>
          <div className="text-xl text-gray-500 flex flex-col gap-6">
            <p>
              <p>
                <p>
                  <p>
                    This project was created as a final project for the Coding
                    Factory 5 at AUEB, demonstrating the skills I have acquired.
                    It features a REST API with CRUD operations, JWT
                    authentication, and password hashing using bcrypt. I
                    generate JWT tokens and create cookies for authentication,
                    ensuring secure user sessions. The frontend is built with
                    React, Vite, TailwindCSS, Axios, and Flowbite-React, with
                    Firebase handling image uploads and Redux for state
                    management. Embracing the diverse skills of a full-stack
                    engineer, I have learned a variety of programming languages
                    and technologies, enabling me to build comprehensive
                    projects like this one. Although it might not be perfect,
                    remember that this is just the start of my journey as a
                    Full-Stack Engineer.
                  </p>
                </p>
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
