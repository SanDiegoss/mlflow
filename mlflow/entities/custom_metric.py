from mlflow.entities._mlflow_object import _MlflowObject
from mlflow.protos.service_pb2 import CustomMetric as ProtoCustomMetric

# class searchable_attribute(property):
#     # Wrapper class over property to designate some of the properties as searchable
#     # run attributes
#     pass


# class orderable_attribute(property):
#     # Wrapper class over property to designate some of the properties as orderable
#     # run attributes
#     pass


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
        if name is None:
            raise Exception("name cannot be None")
        if value is None:
            raise Exception("value cannot be None")
        if run_id is None:
            raise Exception("run_id cannot be None")

        self._name = name
        self._value = value
        self._run_id = run_id

    @property
    def name(self):
        """String containing name."""
        return self._name

    @property
    def value(self):
        """Vlaue of the metric."""
        return self._value

    @property
    def run_id(self):
        """String containing run id."""
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
