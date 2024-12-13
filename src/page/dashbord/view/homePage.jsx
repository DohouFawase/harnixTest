
import RatingHistogramChart from '../../../components/ui/chart/historigram';
import FeedbackCount from './content/feedbackCount';

export default function Home() {
  
  return (
   <>
  <div className="">
    <div className="grid grid-cols-3 gap-3">
  <div className="">
  <FeedbackCount />
  </div>

    </div>


    <div className="mt-12">
      <div className="">
        <h1 className='font-bold text-xl'>Score Overviews</h1>
      </div>

      <RatingHistogramChart />
    </div>
  </div>
   
   </>
  )
}
