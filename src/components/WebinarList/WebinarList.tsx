import React from 'react';
// import classes from './Loading.module.css';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getPostList} from '../../api/commonApi';
import classes from './WebinarList.module.css';
import moment from 'moment';
import { updateList, updatePageNumber, selectPost } from '../../store/actions/user';
import { useHistory } from "react-router-dom";

const WebinarList = (props:any) => {
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const history = useHistory();
  const observe = React.useRef<any>();
  const lastElementRef =  React.useCallback((node) => {
    if(loading) return
    if(observe.current) observe.current.disconnect()
    observe.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        props.updatePageNumber();
      }
        
    })
    if(node) observe.current.observe(node)
  }, [hasMore])

  React.useEffect(() => {
    setLoading(true);
    getPostList(props.pageNumber).then((res) => {
      if(props.pageNumber === res?.data.meta.pagination.total_pages) setHasMore(false)
      const tempArr = [] as any;
      res?.data?.data.forEach((item:any) => {
        if(!item.favourited) tempArr.push(item)
      });
      let updateList = props.list.concat(tempArr);
      props.updateList(updateList)
      setLoading(false);
    })
  }, [props.pageNumber])
  const registerHandler = (item:any) => {
    if(props.info.id) {
      props.selectPost(item);
      props.scrollToForm();
    } else {
      history.push('/login');
    }
    
  }
  return(
    <div className={classes.container}>
      {
        props.list.map((item:any, index:number) => {
          if(props.list.length ===  index + 1) {
            return(
              <div className={classes.listBox} ref={lastElementRef} key={item.id}>
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
                <div className={classes.register} onClick={() => registerHandler(item)}>
                  Register Now
                </div>
              </div>
            )
          } else {
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
                <div className={classes.register} onClick={() => registerHandler(item)}>
                    Register Now
                </div>
              </div>
            )
          }
          
        })
      }
      {
        hasMore
        ?(
          <div className={classes.loading}>
            Loading
          </div>
        )
        :<></>
      }
    </div>
  )
}

const mapStateToProps = (state:any) => {
  return {
    info: state.user.info,
    list: state.user.list,
    pageNumber: state.user.pageNumber,
    selectedPost: state.user.selectedPost,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateList: (value:any) => {
      dispatch(updateList(value))
    },
    updatePageNumber: () => {
      dispatch(updatePageNumber())
    },
    selectPost: (value:any) => {
      dispatch(selectPost(value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WebinarList);