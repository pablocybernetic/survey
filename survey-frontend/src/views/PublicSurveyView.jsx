import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../services/axios.js";
import { BeatLoader } from "react-spinners";
import { PublicQuestionComponent } from "../components/surveys/PublicQuestionComponent.jsx";
import CustomButton from "../components/core/CustomButton.jsx";
import Footer from "../Layouts/Footer.jsx";
import { FiSend } from 'react-icons/fi';  // Fi stands for Feather Icons

const PublicSurveyView = () => {
  const { slug } = useParams();
  const [survey, setSurvey] = useState({ questions: [] });
  const [loading, setLoading] = useState(false);
  const answers = {};
  const navigate = useNavigate();

  // fetch survey on component mount
  useEffect(() => {
    setLoading(true);
    Axios.get(`/view/survey/${slug}`)
      .then(({ data }) => {
        setSurvey(data.data);
        setLoading(false);
      });
  }, []);

  // handle answer update
  const handleAnswerChange = (value, question) => {
    answers[question.uuid] = value;
  };

  // handle answers submit
  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.post(`/survey/answer/${survey.answer_id}`, { answers })
      .then(() => {
        navigate("/thanks", { replace: true });
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <>
    <div className="min-h-screen bg-white-100">
      {loading && (
        <div className="m-8 text-center">
          <BeatLoader color="#3b82f6" />
        </div>
      )}

      {!loading && (
        <div className="w-full p-4 mx-auto sm:p-6 md:w-4/5 lg:w-2/3 xl:w-1/2">
          {/* Survey Card */}
          <div className="flex flex-col gap-4 p-6 my-4 text-center rounded-lg shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 md:p-8 md:gap-6 md:my-8">
            {survey.image_url && (
              <img
                src={survey.image_url}
                alt={survey.title}
                className="w-full h-auto max-w-full mx-auto border border-gray-200 rounded-lg shadow-md md:max-w-2xl lg:max-w-3xl"
              />
            )}
            <h1 className="text-lg font-semibold text-gray-800 sm:text-xl md:text-2xl lg:text-3xl">
              {survey.title}
            </h1>
            <span className="text-xs text-gray-600 sm:text-sm md:text-base">
              Expires after: <b className="text-red-500">{survey.expire_date}</b>
            </span>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg">
              {survey.description}
            </p>
          </div>

          {/* Survey Form */}
          <div className="mt-4 md:mt-6">
            <form
              action="#"
              onSubmit={handleSubmit}
              className="p-4 space-y-4 bg-white rounded-lg shadow-md sm:p-6 md:p-8 md:space-y-6"
            >
              {survey.questions.map((question, index) => (
                <PublicQuestionComponent
                  key={question.uuid}
                  question={question}
                  onAnswerChange={(value) => handleAnswerChange(value, question)}
                />
              ))}
              <CustomButton
      type="submit"
      className="flex items-center justify-center w-full px-4 py-2 mt-4 space-x-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
    >
      <FiSend className="w-5 h-5" /> {/* The icon */}
      <span>Submit</span>
    </CustomButton>
            </form>
          </div>
        </div>
      )}
    </div>
    <br /><br /><br />

    <Footer/>
    </>
  );
};

export default PublicSurveyView;
