from mlflow.entities._mlflow_object import _MlflowObject
from mlflow.entities.observer import Observer
from mlflow.protos.service_pb2 import Rule as ProtoRule


class Rule(_MlflowObject):
    def __init__(self, rule_id, name, experiment_id, run_id, conditions, observers):
        self._rule_id = rule_id
        self._name = name
        self._experiment_id = experiment_id
        self._run_id = run_id
        self._conditions = conditions
        self._observers = observers

    def add_condition(self, condition):
        self._conditions.append(condition)

    def add_observer(self, observer):
        self._observers.append(observer)

    def to_proto(self):
        proto = ProtoRule()
        proto.rule_id = self.rule_id
        proto.name = self.name
        proto.experiment_id = self.experiment_id
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
