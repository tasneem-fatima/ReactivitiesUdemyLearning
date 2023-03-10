import { useEffect, useState } from "react";
// import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import Loadingcomponents from "./Loadingcomponents";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting,setsubmitting]=useState(false);

  useEffect(() => {
    //.get<Activity[]>("http://localhost:5000/api/activities")
    agent.Activities.list().then((response) => {
      console.log(response);
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };
  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };
  const handleFormClose = () => {
    setEditMode(false);
  };
  const handleCreateOrEditActivity = (activity: Activity) => {
    setsubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=> {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
        setSelectedActivity(activity);
        setEditMode(false);
        setsubmitting(false);
      })
    }
    else{
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities,activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setsubmitting(false);
      })
    }
    // activity.id
    //   ? setActivities([
    //       ...activities.filter((x) => x.id !== activity.id),
    //       activity,
    //     ])
    //   : setActivities([...activities, { ...activity, id: uuid() }]);
    // setEditMode(false);
    // setSelectedActivity(activity);
  };
  const handleDeleteActivity = (id: string) => {
    setsubmitting(true);
    agent.Activities.delete(id).then(()=> {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setsubmitting(false);
    })
  };

  if (loading) return <Loadingcomponents content="Loading app" />;
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteHandler={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
