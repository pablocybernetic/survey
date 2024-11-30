export const ThanksView = () => {
  return (
    <div className="p-6 mx-auto mt-24 md:w-1/2">
      <div className="border mockup-window bg-success">
        <div className="flex flex-col items-center justify-center px-6 py-16 bg-green-50">
          <span className="mb-6 text-xl font-medium text-center text-green-900">
            🎉 Thank you for sharing your valuable time and insights with us. Your feedback is greatly appreciated.
          </span>
          <a
            href="https://artcaffemarket.co.ke/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-sm font-semibold text-green-900 transition-all duration-300 ease-in-out bg-green-200 rounded-full shadow-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
          >
            Shop Groceries, Bakery, & Wines
          </a>
          <p className="mt-4 text-sm text-center text-gray-600">
            Enjoy a seamless shopping experience with top-quality products, delivered to your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
};
