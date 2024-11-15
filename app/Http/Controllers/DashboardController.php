<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyAnswer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // define months variables
        $startOfMonth = Carbon::now()->startOfMonth()->toDateString();
        $endOfMonth = Carbon::now()->endOfMonth()->toDateString();
        $startOfLastMonth = Carbon::now()->subMonth(1)->startOfMonth()->toDateString();
        $endOfLastMonth = Carbon::now()->subMonth(1)->endOfMonth()->toDateString();

        return [
            'total_surveys' => $this->getTotalSurveys($user->id)->count(),
            'total_answers' => $this->getTotalAnswersBetween($user->id, $startOfMonth, $endOfMonth)->count(),
            'answers_of_the_month_statistics_labels' => $this->getTotalAnswersStatisticsBetween($user->id, $startOfMonth, $endOfMonth)['labels'],
            'answers_of_the_month_statistics_data' => $this->getTotalAnswersStatisticsBetween($user->id, $startOfMonth, $endOfMonth)['data'],
            'latest_answer_date' => \Carbon\Carbon::parse($this->getLatestAnswer($user->id)['end_date'])->diffForHumans(),
            'total_completed_answers' => $this->getTotalCompletedAnswers($user->id)->count(),
            'completed_percentage' => $this->getPercentageOfCompletedAnswers($user->id, $startOfMonth, $endOfMonth),
            'total_remaining_answers' => $this->getUnCompletedAnswers($user->id)->count(),
            'answers_compared_to_last_month_percentage' => $this->percentageOfAnswersChangeBetween($user->id, $startOfLastMonth, $endOfLastMonth),
            'top_surveys' => $this->getTopSurveys($user->id),
        ];
    }

    /*
     * Get total surveys
     */

    private function getTotalSurveys($userId)
    {
        return Survey::where('user_id', $userId);
    }

    /*
     * Get Total Answers in between the given dates
     * */

    private function getTotalAnswersBetween($userId, $startDate, $endDate)
    {
        return SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $userId)
            ->whereBetween('start_date', [$startDate, $endDate])
            ->orderBy('start_date')
            ->get();
    }

    /*
     * Get Latest Answer
     * */

    private function getLatestAnswer($userId)
    {
        // latest answers in
        return SurveyAnswer::join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $userId)
            ->orderByDesc('end_date')
            ->first(['end_date']);
    }

    /*
     * Get total completed answers
     * */
    public function getTotalCompletedAnswers($userId)
    {
        return SurveyAnswer::join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $userId)
            ->where('survey_answers.end_date', '>', 'survey_answers.start_date')
            ->get();
    }

    /*
     * Get top surveys
     * */
// doesnt load
    // private function getTopSurveys($userId)
    // {
    //     return Survey::select('surveys.*', DB::raw('COUNT(survey_answers.id) as total_answers'))
    //         ->where('surveys.user_id', $userId)
    //         ->leftJoin('survey_answers', 'surveys.id', '=', 'survey_answers.survey_id')
    //         ->groupBy('surveys.id')
    //         ->orderByDesc('total_answers')
    //         ->limit(10)
    //         ->get();
    // }
    private function getTopSurveys($userId)
    {
        return Survey::select('surveys.id', 'surveys.title', 'surveys.created_at', DB::raw('COUNT(survey_answers.id) as total_answers'))
            ->where('surveys.user_id', $userId)
            ->leftJoin('survey_answers', 'surveys.id', '=', 'survey_answers.survey_id')
            ->groupBy('surveys.id', 'surveys.title', 'surveys.created_at')
            ->orderByDesc('total_answers')
            ->limit(10)
            ->get();
    }

    /*
     * Get list of uncompleted answers
     * */

    private function getUnCompletedAnswers($userId)
    {
        return SurveyAnswer::join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $userId)
            ->whereNull('survey_answers.end_date')
            ->get();
    }

    /*
     * get percentage of answers compared to last month
     * */

    private function percentageOfAnswersChangeBetween($userId, $startDate, $endDate)
    {
        $total_answers_last_month = $this->getTotalAnswersBetween($userId, $startDate, $endDate)->count();
        // percentage of answers compared to last month
        if ($total_answers_last_month !== 0) {
            return (($this->getTotalSurveys($userId)->count() - $total_answers_last_month) / $total_answers_last_month) * 100;
        }
        return 0;
    }

    /*
     * Get Percentage of Completed Answers
     * */

    private function getPercentageOfCompletedAnswers($userId, $startDate, $endDate)
    {
        $completed_percentage = 0;

        // percentage of completed answers
        if ($this->getTotalSurveys($userId)->count() > 0) {
            $completed_percentage = ($this->getTotalCompletedAnswers($userId)->count() / $this->getTotalAnswersBetween($userId, $startDate, $endDate)->count()) * 100;
        }

        return round($completed_percentage);
    }

    /*
     * Get Answer Of month in statistics
     * */

    private function getTotalAnswersStatisticsBetween($userId, $startDate, $endDate)
    {
        // Initialize empty arrays for the x-axis and y-axis data
        $labels = [];
        $data = [];

        // Loop through each SurveyAnswer and extract the relevant data
        foreach ($this->getTotalAnswersBetween($userId, $startDate, $endDate) as $answer) {

            // Get the date of the SurveyAnswer and format it as desired
            $date = date('Y-m-d', strtotime($answer->start_date));

            // If this date has not been encountered before, add it to the labels array
            if (!in_array($date, $labels)) {
                $labels[] = $date;
            }

            // Increment the count for this date in the data array
            if (isset($data[$date])) {
                $data[$date]++;
            } else {
                $data[$date] = 1;
            }
        }

        return [
            'labels' => $labels,
            'data' => array_values($data),
        ];
    }
// In Survey.php (Model)


public function getAllAnswers($slug)
{
    // Use the provided slug instead of hardcoding it
    // Query to get all questions and answers for a specific survey based on the slug
    $results = DB::table('survey_questions as sq')
        ->leftJoin('survey_question_answers as sqqa', 'sq.id', '=', 'sqqa.survey_question_id')
        ->join('surveys as s', 's.id', '=', 'sq.survey_id') // Join with surveys table
        ->where('s.slug', '=', $slug) // Use the provided slug
        ->select(
            'sq.id as question_id',
            'sq.question',
            'sq.type as question_type',
            'sq.data as question_data', // Retrieve the 'data' field with options
            'sqqa.survey_answer_id',
            'sqqa.answer'
        )
        ->orderBy('sq.id')
        ->orderBy('sqqa.survey_answer_id')
        ->get();

    // Process and group the results as before
    $groupedResults = $results->groupBy('question_id');

    foreach ($groupedResults as $question_id => $answers) {
        $question_data = json_decode($answers[0]->question_data, true);
        $options = $question_data['options'] ?? [];

        // Map UUIDs to text labels
        $uuidToTextMap = [];
        foreach ($options as $option) {
            $uuidToTextMap[$option['uuid']] = $option['text'];
        }

        foreach ($answers as $answer) {
            if ($answer->question_type === 'checkbox') {
                $answerArray = json_decode($answer->answer, true);

                foreach ($answerArray as &$selectedAnswer) {
                    if (isset($uuidToTextMap[$selectedAnswer['uuid']])) {
                        $selectedAnswer['text'] = $uuidToTextMap[$selectedAnswer['uuid']];
                    }
                }

                $texts = array_map(fn($item) => $item['text'], $answerArray);
                $answer->answer = implode(', ', $texts);

            } elseif ($answer->question_type === 'radio') {
                $answerArray = json_decode($answer->answer, true);
                $answer->answer = $answerArray['text'];

            } else {
                if (isset($uuidToTextMap[$answer->answer])) {
                    $answer->answer = $uuidToTextMap[$answer->answer];
                }
            }
        }
    }

    return $groupedResults;
}


}
