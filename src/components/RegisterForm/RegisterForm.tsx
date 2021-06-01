import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getPostList, addFavorite } from '../../api/commonApi';
import classes from './RegisterForm.module.css';
import { updateList, updatePageNumber, selectPost } from '../../store/actions/user';

const RegisterForm = (props:any) => {
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [openOptions, setOpenOptions] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
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
      if(props.pageNumber === res.data.meta.pagination.total_pages) setHasMore(false)
      const tempArr = [] as any;
      res.data.data.forEach((item:any) => {
        if(!item.favourited) tempArr.push(item)
      });
      let updateOptions = props.list.concat(tempArr);
      setOptions(updateOptions)
      setLoading(false);
    })
  }, [props.pageNumber])

  const selectHandler = (item:any) => {
    setOpenOptions(false);
    props.selectPost(item);
  }

  const registerHandler = () => {
    addFavorite(props.selectedPost.id).then((res) => {
      props.selectPost({});
      alert('Register Success');
    }).catch((err) => {
      console.log(err);
    });
  }

  const renderButton = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(props.selectedPost.id && firstName && lastName && re.test(String(email).toLowerCase())) {
      return(
        <div className={classes.activeButton} onClick={registerHandler}>
          Register
        </div>
      )
    } else {
      return(
        <div className={classes.inactiveButton}>
          Register
        </div>
      )
    }
    
  }
  return(
    <div className={classes.container} ref={props.formRef}>
        <div className={classes.textFields}>
          <div className={classes.title}>
            Register for a Webinar now
          </div>
          <div className={classes.content}>
            Please fill in the form below and you will be contacted by one of our professional business experts.
          </div>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.label}>
            Topic
          </div>
          <div className={classes.dropdownContainer}>
            <div className={classes.dropdownText} onClick={() => setOpenOptions(true)}>
              {props.selectedPost.title}
            </div>
            {
              openOptions?
              <div className={classes.dropdown}>
                {
                  props.list.map((item:any, index:number) => {
                      if(props.list.length ===  index + 1) {
                      return(
                        <div key={item.id } className={classes.option} ref={lastElementRef}>
                          {item.title}
                        </div>
                      )
                    } else {
                      return(
                        <div key={item.id} className={classes.option} onClick={() => selectHandler(item)}>
                          {item.title}
                        </div>
                      )
                    }
                  })
                }
                {
                  loading
                  ?(
                    <div className={classes.loading}>
                      Loading
                    </div>
                  )
                  :<></>
                  
                }
              </div>
              :<></>
            }
          </div>
          <div className={classes.label}>
            First Name
          </div>
          <div>
            <input className={classes.input} value={firstName} onChange={(e:any) => setFirstName(e.target.value)}/>
          </div>
          <div className={classes.label}>
            Last Name
          </div>
          <div>
            <input className={classes.input} value={lastName} onChange={(e:any) => setLastName(e.target.value)}/>
          </div>
          <div className={classes.label}>
            Email
          </div>
          <div>
            <input className={classes.input} value={email} onChange={(e:any) => setEmail(e.target.value)}/>
          </div>
          {renderButton()}
        </div>
        {
          openOptions?
          <div className={classes.fullScreen} onClick={() => setOpenOptions(false)}/>
          :<></>
        }
    </div>
  )
}

const mapStateToProps = (state:any) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);