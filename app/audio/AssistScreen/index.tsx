import React, { useEffect, useState } from 'react';
import { ExcectionInfo } from '../action/action.executor';
import AudioActionUtil from '../action/action.util';

const AssistScreen = () => {
  const [screens, setScreens] = useState([]);
  useEffect(() => {
    const sub = ExcectionInfo.subscribe(pushToScreens);
    return () => {
      sub.unsubscribe();
    };
  }, []);

  const onlySuccess = (screens) => {
    const final =
      screens.length > 10
        ? screens.filter((s) => s.type === 'SUCCESS')
        : screens;
    return screens.length > 10 && final.length > 5 ? final.slice(-5) : final;
  };

  const pushToScreens = (actionInfo) => {
    console.log(actionInfo);
    if (actionInfo.badFollowUp) {
      setScreens((s) => [
        ...onlySuccess(s),
        {
          type: 'ERROR',
          msg: `Invalid follow up commad: ${actionInfo.command}`,
        },
      ]);
    } else if (actionInfo.cannotFind) {
      setScreens((s) => [
        ...onlySuccess(s),
        {
          type: 'ERROR',
          msg: `Cannot find such shape closest to pointer: ${actionInfo.command}`,
        },
      ]);
    } else if (!actionInfo.success) {
      setScreens((s) => [
        ...onlySuccess(s),
        { type: 'ERROR', msg: `${actionInfo.errorMsg()}` },
      ]);
    } else if (actionInfo.complete) {
      setScreens((s) => [
        ...onlySuccess(s),
        {
          type: 'COMPLETE',
        } /* , { type: 'START', msg: 'Start new command' } */,
      ]);
    } else if (actionInfo.command) {
      const final = [];
      final.push({ type: 'SUCCESS', msg: `${actionInfo.command}` });
      actionInfo.sugesstions &&
        final.push({ type: 'SUGESSTION', msg: `${actionInfo.sugesstions()}` });
      setScreens((s) => [...onlySuccess(s), ...final]);
    }
  };

  return (
    <div className="text-small">
      {screens.map(({ type, msg }, index) =>
        (() => {
          if (type === 'SUCCESS') {
            return (
              <small className="d-block text-success" key={`${type}_${index}`}>
                Success: {msg}
              </small>
            );
          }
          if (type === 'SUGESSTION') {
            return (
              <small className="d-block text-primary" key={`${type}_${index}`}>
                {'Help: '} {msg}
              </small>
            );
          }
          if (type === 'ERROR') {
            return (
              <small className="d-block text-danger" key={`${type}_${index}`}>
                Error: {msg}
              </small>
            );
          }
          if (type === 'COMPLETE') {
            return (
              <small className="d-block text-info" key={`${type}_${index}`}>
                <small className="d-block text-info">
                  ......................................................
                </small>
                <small className="d-block text-info">
                  Random Command {'->'} Ex:
                  {AudioActionUtil.getRandomAction()}
                </small>
              </small>
            );
          }
          return (
            <small className="d-block text-secondary" key={`${type}_${index}`}>
              {msg}
            </small>
          );
        })()
      )}
    </div>
  );
};

export default AssistScreen;
