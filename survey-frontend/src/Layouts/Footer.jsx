import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="py-12 bg-gradient-to-r from-green-200 to-green-900">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center xl:flex xl:items-center xl:justify-between xl:text-left">
          <div className="xl:flex xl:items-center xl:justify-start">
            <img
              className="w-auto mx-auto h-7"
              src="https://survey.artcaffe.co.ke/Artcaffe-Logo.png"
              alt="Artcaffe Logo"
            />
          
          </div>

          <div className="items-center mt-8 xl:mt-0 xl:flex xl:justify-end xl:space-x-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 xl:justify-end">
              <li>
                <a
                  href="https://www.artcaffemarket.co.ke/"
                  title=""
                  className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  ArtcaffeMarket
                </a>
              </li>

              <li>
                <a
                  href="https://www.artcaffe.co.ke"
                  title=""
                  className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  Artcaffe
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  Support
                </a>
              </li>
            </ul>

            <div className="w-full h-px mt-8 mb-5 xl:w-px xl:m-0 xl:h-6 bg-gray-50/20"></div>

            <ul className="flex items-center justify-center space-x-8 xl:justify-end">
              <li>
                <a
                  href="#"
                  title=""
                  className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                    ></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                    <circle cx="16.806" cy="7.207" r="1.078"></circle>
                    <path
                      d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.688.311c-.962.053-1.267.056-3.71.056-2.442 0-2.753 0-3.71-.056a4.96 4.96 0 0 1-1.688-.311 3.002 3.002 0 0 1-1.711-1.711 4.986 4.986 0 0 1-.311-1.688c-.053-.962-.056-1.267-.056-3.71 0-2.442 0-2.753.056-3.71.042-.962.158-1.494.311-1.688a2.987 2.987 0 0 1 1.711-1.712 4.975 4.975 0 0 1 1.688-.311c.963-.043 1.268-.056 3.71-.056 2.442 0 2.753 0 3.71.056a4.962 4.962 0 0 1 1.688.311 2.998 2.998 0 0 1 1.712 1.712c.144.194.269.727.311 1.688.056.962.056 1.267.056 3.71s0 2.753-.056 3.71z"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
            <p className="mt-5 text-sm text-white xl:ml-6 xl:mt-0">
              © Copyright {currentYear} Artcaffe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
