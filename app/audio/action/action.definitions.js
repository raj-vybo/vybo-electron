const ActionDefinitions = {
  InitiateShapeAction: {
    match: ':action :mid :shape',
    regexp: /^(Draw|Move|Remove|Fill) (A|An|This) (Line|Circle|Rectangle|Arrow)$/
  },
  FinishShapeAction: {
    match: ':somethingAffirmative',
    regexp: /^(to this point|yes|to here|yep|affirmative|stop|yeah|right|good)$/
  },
  FillConfirmAction: {
    match: '(with) :color colour'
  },
  RemoveConfirmAction: {
    match: 'yes remove'
  },
  TextInputAction: {
    match: ':somePrefix :inputTxt',
    regexp: /^(annotate as|write text|annotate with|This is|this is an|this is a|label this as) (.*)$/
  }
};

export default ActionDefinitions;
