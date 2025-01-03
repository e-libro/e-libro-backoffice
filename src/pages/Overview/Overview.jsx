import LanguagesDistributionReport from "../../components/LanguagesDistributionReport/LanguagesDistributionReport"
import TopBooksChart from "../../components/TopBooksChart/TopBooksChart"
import MonthlyUserSignupsReport from "../../components/MonthlyUserSignupsReport/MonthlyUserSignupsReport"

const Overview = () => {
    return (
      <div>
        <TopBooksChart/>
        <LanguagesDistributionReport/>
        <MonthlyUserSignupsReport/>
      </div>
    )
  }
  
  export default Overview