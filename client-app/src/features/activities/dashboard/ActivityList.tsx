import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, List, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';
interface Props{
    activity: Activity[];
    selectActivity:(id:string)=> void;
   // cancelActivity: ()=> void; 
   deleteHandler:(id: string)=> void;
   submitting: boolean;
  }
function ActivityList(props: Props) {

  const [target, setTarget]= useState("");

  const handleActivityDelete=(e: SyntheticEvent<HTMLButtonElement>,id:string)=> {
    setTarget(e.currentTarget.name);
    props.deleteHandler(id);
  }


  return (
    <Segment>
        <Item.Group divided>
        {props.activity.map(activity => (
          <Item key={activity.id}>
            {/* {activity.title} */}
            <Item.Content>
                <Item.Header as='a'>{activity.title}
                </Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.city}, {activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button 
                    onClick={()=>props.selectActivity(activity.id)}
                    floated='right' content='View'
                    color='blue'/>
                    <Button
                    name={activity.id}
                    loading={props.submitting && target===activity.id}
                    onClick={(e)=>handleActivityDelete(e,activity.id)}
                    floated='right' content='Delete'
                    color='red'/>
                    <Label basic content={activity.category}/>
                </Item.Extra>
            </Item.Content>
          </Item>
        ))}
        </Item.Group>
        
    </Segment>
        
      
  )
}

export default ActivityList