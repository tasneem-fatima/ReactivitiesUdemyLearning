import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit:(activity: Activity)=> void;
}
function ActivityForm(props: Props) {
  const initialState = props.activity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };
  const [activity, setActivity] = useState(initialState);
  const handleSubmit = () => {
    console.log(activity,'Activity');
    props.createOrEdit(activity);
  };
  const hanldeInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={hanldeInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={hanldeInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={hanldeInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={hanldeInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={hanldeInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={hanldeInputChange}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={props.closeForm}
          floated="right"
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}

export default ActivityForm;
