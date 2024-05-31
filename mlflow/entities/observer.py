from mlflow.entities._mlflow_object import _MlflowObject
from mlflow.protos.service_pb2 import Observer as ProtoObserver


class Observer(_MlflowObject):
    """
    Data about observer.
    """

    def __init__(
        self,
        id,
        method,
        user_id,
    ):
        if id is None:
            raise Exception("id cannot be None")
        if method is None:
            raise Exception("method cannot be None")
        if user_id is None:
            raise Exception("user_id cannot be None")

        self._id = id
        self._method = method
        self._user_id = user_id

    @property
    def id(self):
        """String containing ID."""
        return self._id

    @property
    def method(self):
        """Method."""
        return self._method

    @property
    def user_id(self):
        """ID of the user."""
        return self._user_id

    def to_proto(self):
        proto = ProtoObserver()
        proto.id = self.id
        proto.method = self.method
        proto.user_id = self.user_id
        return proto

    @classmethod
    def from_proto(cls, proto):
        return cls(
            id=proto.id,
            method=proto.method,
            user_id=proto.user_id,
        )
