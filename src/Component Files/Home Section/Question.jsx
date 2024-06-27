const Question = () => {
  return (
    <div>
        <h1 className="text-center text-[#FFF] text-3xl font-bold border bg-slate-500 w-4/6 m-auto rounded-lg mt-6 mb-5"> <marquee> More Question ? </marquee> </h1>
      <div className="text-white">
      <div className="collapse collapse-plus bg-gray-500">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">
        What is the goal of this animal donation campaign?
        </div>
        <div className="collapse-content">
          <p>
          Our campaign aims to raise funds to support animal rescue operations, provide medical care, shelter, and promote adoption services for homeless, abandoned, and abused animals.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-gray-500">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        How can I donate to the campaign?
        </div>
        <div className="collapse-content">
          <p>
          You can donate through our website by clicking the Donate Now button, which will take you to a secure payment portal. We accept various payment methods including credit/debit cards, PayPal, and direct bank transfers.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-gray-500">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        Is my donation tax-deductible?
        </div>
        <div className="collapse-content">
          <p>
          Yes, donations to our organization are tax-deductible to the extent allowed by law. You will receive a confirmation email and a receipt for your donation, which you can use for tax purposes.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-gray-500">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        How will my donation be used?
        </div>
        <div className="collapse-content">
          <p>
          Your donation will directly support our animal welfare projects, including medical care, food, shelter, and rehabilitation for animals in need. Additionally, funds may support advocacy and education programs to promote responsible pet ownership.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Question;
