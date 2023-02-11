import React from 'react'
import { Button, Item, Label, List, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';
interface Props{
    activity: Activity[];
    selectActivity:(id:string)=> void;
   // cancelActivity: ()=> void; 
   deleteHandler:(id: string)=> void;
  }
function ActivityList(props: Props) {
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
                    onClick={()=>props.deleteHandler(activity.id)}
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