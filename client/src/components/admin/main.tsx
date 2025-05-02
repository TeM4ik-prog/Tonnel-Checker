import { useState } from "react"

export const MainAdmin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  // const [usersWhoGetReport, setUsersWhoGetReport] = useState([])



  // const eventHandler = async (func: Function) => {
  //   setIsLoading(true)
  //   await func()
  //   setIsLoading(false)
  // }

  return (
    <div className="admin-main-page">
      <div className="butts">

      </div>

      <h1>Главная</h1>


      <div className="butts">


        {/* {isLoading && <Loader />} */}
      </div>
    </div>

  )
}