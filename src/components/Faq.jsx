

const Faq = () => {
    return (
        <div className="max-w-7xl mx-auto px-6">
  <h2 className="text-4xl font-bold text-center text-blue-950 mb-8 mt-10">
    Frequently Asked Questions(FAQ)
  </h2>
  <div className="space-y-4">
    {/* Question 1 */}
    <div className="border-b pb-4">
      <h3 className="text-lg font-semibold text-gray-800 cursor-pointer">
        What is this platform about?
      </h3>
      <p className="mt-2">
        This is an online group-study platform where students and professionals can collaborate, 
        share knowledge, and work on assignments together in a structured environment.
      </p>
    </div>

    {/* Question 2 */}
    <div className="border-b pb-4">
      <h3 className="text-lg font-semibold text-gray-800 cursor-pointer">
        How do I join a study group?
      </h3>
      <p className="mt-2">
        You can join a study group by signing up, searching for available groups, and sending a 
        request to join. Some groups may require approval from the admin.
      </p>
    </div>

    {/* Question 3 */}
    <div className="border-b pb-4">
      <h3 className="text-lg font-semibold text-gray-800 cursor-pointer">
        Can I create my own study group?
      </h3>
      <p className="mt-2">
        Yes! You can create a study group, invite members, and manage discussions, assignments, 
        and resources within the group.
      </p>
    </div>

    {/* Question 4 */}
    <div className="border-b pb-4">
      <h3 className="text-lg font-semibold text-gray-800 cursor-pointer">
        What features does this platform offer?
      </h3>
      <p className="mt-2">
        Our platform includes real-time chat, assignment management, collaborative document editing, 
        live video discussions, and personalized study schedules.
      </p>
    </div>

    {/* Question 5 */}
    <div className="border-b pb-4">
      <h3 className="text-lg font-semibold text-gray-800 cursor-pointer">
        Is there a dark mode available?
      </h3>
      <p className="mt-2">
        Yes! You can switch between light and dark themes based on your preference.
      </p>
    </div>

    {/* Question 6 */}
    <div className="border-b pb-4">
      <h3 className="text-lg font-semibold text-gray-800 cursor-pointer">
        Can I access this platform on mobile?
      </h3>
      <p className="mt-2">
        Yes! Our platform is fully responsive and works smoothly on mobile, tablet, and desktop devices.
      </p>
    </div>
  </div>
</div>

    );
};

export default Faq;