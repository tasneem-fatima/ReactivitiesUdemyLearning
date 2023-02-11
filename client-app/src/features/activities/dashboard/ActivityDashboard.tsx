import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteHandler:(id: string)=> void;
}
function ActivityDashboard(props: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activity={props.activities}
          selectActivity={props.selectActivity}
          deleteHandler={props.deleteHandler}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {props.selectedActivity && (
          <ActivityDetails
            activity={props.selectedActivity}
            cancelActivity={props.cancelActivity}
            openForm={props.openForm}
          />
        )}
        {props.editMode && (
          <ActivityForm
            closeForm={props.closeForm}
            activity={props.selectedActivity}
            createOrEdit={props.createOrEdit}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

export default ActivityDashboard;
