export default function ThankYouStep() {
  return (
    <div className="bg-white m-4 rounded-md p-6 flex flex-col justify-center items-center gap-4 py-20">
      <img
        src="/images/icon-thank-you.svg"
        alt="thank-you"
        width={"60px"}
        height={"60px"}
      />
      <p className="text-primary font-bold text-2xl">Thank you!</p>
      <p className="text-gray-500 text-center">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
    </div>
  );
}
