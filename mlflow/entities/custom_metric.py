from mlflow.entities._mlflow_object import _MlflowObject
from mlflow.protos.service_pb2 import CustomMetric as ProtoCustomMetric


class CustomMetric(_MlflowObject):
    """
    Data about custom metric.
    """

    def __init__(
        self,
        name,
        value,
        run_id,
    ):
        self._name = name
        self._value = value
        self._run_id = run_id

    @property
    def name(self):
        return self._name

    @property
    def value(self):
        return self._value

    @property
    def run_id(self):
        return self._run_id

    def to_proto(self):
        proto = ProtoCustomMetric()
        proto.name = self.name
        proto.value = self.value
        proto.run_id = self.run_id
        return proto

    @classmethod
    def from_proto(cls, proto):
        return cls(
            name=proto.name,
            value=proto.value,
            run_id=proto.run_id,
        )
