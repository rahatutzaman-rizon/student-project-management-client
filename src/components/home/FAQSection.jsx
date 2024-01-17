const FAQSection = () => {
  return (
    <section className="mt-16">
      <div className="container">
        <h2 className="text-3xl font-semibold mb-2 text-center">Frequently Asked <span className="text-primary">Questions</span></h2>
        <p className="max-w-[500px] mx-auto text-center mb-8">Here are given all the features that you will use to improve your group study with StudyHub!</p>

        <div className="max-w-[900px] mx-auto">
          <div className="collapse collapse-arrow bg-gray-200 mb-2">
            <input type="radio" name="my-accordion-2" checked="checked" /> 
            <div className="collapse-title text-xl font-medium">
              How can I use this platform?
            </div>
            <div className="collapse-content"> 
              <p>If you want to use the StudyHub platform with your friends to improve your group study, you will have to create and account in StudyHub platform. Then you will be able to create assignment for your friends, submit assignment, review submitted assignments of your friends and so on.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-gray-200 mb-2">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium">
              How can I submit my assignment in StudyHub?
            </div>
            <div className="collapse-content"> 
              <p>After login, go to the assignments page and select the assignment that you want to submit. Click submit button and submit your assignment pdf link. Then click submit button and you are done. Now your friends are able to review your assignment.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-gray-200 mb-2">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium">
              How can I review my friends assignment?
            </div>
            <div className="collapse-content"> 
              <p>After login, go to the submitted assignments page. Then select an assignment that you want to review. Click on review button and watch the assignment pdf and give marks on this assignment. After that press review button and you are done.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;