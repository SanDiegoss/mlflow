from mlflow.entities._mlflow_object import _MlflowObject
from mlflow.entities.observer import Observer
from mlflow.protos.service_pb2 import Rule as ProtoRule


class Rule(_MlflowObject):
    """
    Data about rule.
    """

    def __init__(self, rule_id, name, experiment_id, run_id, conditions, observers):
        if rule_id is None:
            raise Exception("rule_id cannot be None")
        if name is None:
            raise Exception("name cannot be None")
        if experiment_id is None:
            raise Exception("experiment_id cannot be None")
        if run_id is None:
            raise Exception("run_id cannot be None")

        self._rule_id = rule_id
        self._name = name
        self._experiment_id = experiment_id
        self._run_id = run_id
        self._conditions = conditions
        self._observers = observers

    @property
    def rule_id(self):
        """String containing name."""
        return self._rule_id

    @property
    def name(self):
        """String containing name."""
        return self._name

    @property
    def experiment_id(self):
        """Vlaue of the metric."""
        return self._experiment_id

    @property
    def run_id(self):
        """String containing run id."""
        return self._run_id

    @property
    def conditions(self):
        """String containing run id."""
        return self._conditions

    @property
    def observers(self):
        """String containing run id."""
        return self._observers

    def add_condition(self, condition):
        self._conditions.append(condition)

    def add_observer(self, observer):
        self._observers.append(observer)

    def to_proto(self):
        proto = ProtoRule()
        proto.rule_id = self.rule_id
        proto.name = self.name
        proto.run_id = self.run_id
        proto.conditions.extend(list(self._conditions))
        proto.observers.extend([o.to_proto() for o in self._observers])
        return proto

    @classmethod
    def from_proto(cls, proto):
        conditions = list(proto.conditions)
        observers = [Observer.from_proto(c) for c in proto.observers]
        return cls(
            rule_id=proto.rule_id,
            name=proto.name,
            experiment_id=proto.experiment_id,
            run_id=proto.run_id,
            conditions=conditions,
            observers=observers,
        )
