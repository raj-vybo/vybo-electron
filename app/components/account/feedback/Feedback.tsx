import React, { useReducer, FormEvent } from 'react';
import { ipcRenderer } from 'electron';

import Modal from 'react-bootstrap/esm/Modal';
import NavigationButton from 'components/wytboard/guides/nav-btn/NavigationButton';
import GreenTickSvg from 'resources/svgs/common/GreenTickSvg.svg';
import VerySadSvg from './svgs/VerySadSvg';
import SadSvg from './svgs/SadSvg';
import OkayishSvg from './svgs/OkayishSvg';
import HappySvg from './svgs/HappySvg';
import VeryHappySvg from './svgs/VeryHappySvg';
import {
  negativeFeedbacksList,
  feedbackReducer,
  initialFeedbackState,
  positiveFeedbacksList,
} from './feedback.logic';
import FeedbackListItem from './FeedbackListItem/FeedbackListItem';

import { useAuth } from '../helpers/userAuth';
import { submitFeedbackApi } from '../helpers/accountApis';

import {
  VYBO_POPUP_BODY_STYLES,
  VYBO_POPUP_HEADER_STYLES,
  FEEDBACK_SATISFACTION_QUESTION_STYLES,
} from './feedback.styles';

const Feedback = () => {
  const modalRef = React.createRef();

  const [state, dispatch] = useReducer(feedbackReducer, initialFeedbackState);

  const { user } = useAuth();

  const quitApp = () => {
    ipcRenderer.send('close-appliation');
  };

  const submitFeedback = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    dispatch({ type: 'FEEDBACK_SUBMIT' });

    submitFeedbackApi({
      token: user?.token || '',
      comment: state.comment,
      rating: state.rating || 0,
      feedbacks: state.feedbacks,
    })
      .then(() => {
        dispatch({ type: 'FEEDBACK_SUBMIT_SUCCESS' });
        setTimeout(() => quitApp(), 1500);
      })
      .catch((err) => {
        console.log(err);
        quitApp();
      });
  };

  return (
    <Modal
      ref={modalRef}
      show
      size="lg"
      centered
      backdrop
      keyboard={false}
      id="cameraPopup"
    >
      <Modal.Body style={VYBO_POPUP_BODY_STYLES}>
        {(() => {
          if (state.feedbackGiven === 'YES') {
            return (
              <div className="d-flex justify-content-center">
                <img src={GreenTickSvg} alt="" className="mr-1" />
                <p style={VYBO_POPUP_HEADER_STYLES}>
                  Thankyou for your feedback
                </p>
              </div>
            );
          }

          return (
            <>
              <p style={VYBO_POPUP_HEADER_STYLES}>Share your feedback</p>

              <p style={FEEDBACK_SATISFACTION_QUESTION_STYLES}>
                How satisfied are you with Vybo?
              </p>

              <div className="d-flex align-items-center justify-content-around mx-5 mb-3">
                <VerySadSvg
                  onClick={() =>
                    dispatch({ type: 'FEEDBACK_RATINGS_CHANGE', change: 1 })
                  }
                  active={state.rating === 1}
                />
                <SadSvg
                  onClick={() =>
                    dispatch({ type: 'FEEDBACK_RATINGS_CHANGE', change: 2 })
                  }
                  active={state.rating === 2}
                />
                <OkayishSvg
                  onClick={() =>
                    dispatch({ type: 'FEEDBACK_RATINGS_CHANGE', change: 3 })
                  }
                  active={state.rating === 3}
                />
                <HappySvg
                  onClick={() =>
                    dispatch({ type: 'FEEDBACK_RATINGS_CHANGE', change: 4 })
                  }
                  active={state.rating === 4}
                />
                <VeryHappySvg
                  onClick={() =>
                    dispatch({ type: 'FEEDBACK_RATINGS_CHANGE', change: 5 })
                  }
                  active={state.rating === 5}
                />
              </div>

              {state.rating !== null && (
                <div className="d-flex flex-wrap justify-content-center mb-3">
                  {(() => {
                    if (state.rating < 5) {
                      return (
                        <>
                          <p style={FEEDBACK_SATISFACTION_QUESTION_STYLES}>
                            What went wrong?
                          </p>
                          <FeedbackList
                            list={negativeFeedbacksList}
                            feedbacks={state.feedbacks}
                            onClick={(feedback: string) =>
                              dispatch({
                                type: 'FEEDBACKS_CHANGE',
                                change: feedback,
                              })
                            }
                          />
                        </>
                      );
                    }
                    return (
                      <>
                        <p style={FEEDBACK_SATISFACTION_QUESTION_STYLES}>
                          What did you like best?
                        </p>
                        <FeedbackList
                          list={positiveFeedbacksList}
                          feedbacks={state.feedbacks}
                          onClick={(feedback: string) =>
                            dispatch({
                              type: 'FEEDBACKS_CHANGE',
                              change: feedback,
                            })
                          }
                        />
                      </>
                    );
                  })()}
                </div>
              )}

              {(state.feedbacks.length !== 0 || state.rating !== null) && (
                <div className="d-flex justify-content-center my-5">
                  <NavigationButton onClick={submitFeedback}>
                    Submit
                  </NavigationButton>
                </div>
              )}
            </>
          );
        })()}
      </Modal.Body>
    </Modal>
  );
};

export default Feedback;

function FeedbackList({
  list,
  feedbacks,
  onClick,
}: {
  list: string[];
  feedbacks: string[];
  onClick: (item: string) => void;
}) {
  return (
    <>
      {list.map((feedback) => (
        <FeedbackListItem
          key={feedback}
          text={feedback}
          active={feedbacks.includes(feedback)}
          onClick={() => onClick(feedback)}
        />
      ))}
    </>
  );
}
