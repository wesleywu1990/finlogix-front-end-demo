import React from 'react';
import classes from './FavoritePostPage.module.css';
import { getFavoritePost, deleteFavorite } from '../../api/commonApi';
import { connect } from 'react-redux';
import moment from 'moment';

const FavoritePostPage = (props:any) => {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    getFavoritePost(props.info.id).then((res) => {
      setList(res?.data?.data);
    }).catch((err) => {
      console.log(err)
    })
  }, []);
  const unregisterHandler = (item:any) => {
    deleteFavorite(item.id).then((res) => {
      
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className={classes.container}>
      {
        list.map((item:any) => {
          return(
            <div className={classes.listBox} key={item.id}>
              <div>
                <div className={classes.date}>
                  {moment(new Date(item.created_at)).format('DD/MM/YYYY')}
                </div>
                <div className={classes.title}>
                  {item.title}
                </div>
                <div className={classes.content} dangerouslySetInnerHTML={{__html: item.content}} />
                <div className={classes.updateDate}>
                  {moment(new Date(item.created_at)).add(10,'days').format('YYYY/MM/DD hh:mm')}
                </div>
              </div>
              <div className={classes.register} onClick={() => unregisterHandler(item)}>
                Unregister
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

const mapStateToProps = (state:any) => {
  return {
    info: state.user.info,
  }
}

export default connect(mapStateToProps)(FavoritePostPage);
