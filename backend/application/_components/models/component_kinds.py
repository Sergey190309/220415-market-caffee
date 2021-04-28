from typing import Dict, Union
from sqlalchemy.exc import InvalidRequestError

from application.modules.dbs_global import dbs_global


class ComponentKindsModel(dbs_global.Model):
    '''
    The model for storage kinds of components used in component model.
    Used to systematise components.
    '''
    __tablename__ = 'component_kinds'
    id_kind = dbs_global.Column(dbs_global.String(64), primary_key=True)
    description = dbs_global.Column(dbs_global.UnicodeText)

    @classmethod
    def find_by_id(
            cls, id_kind: str = None) -> 'ComponentKindsModel':
        # print(id_kind)
        return cls.query.filter_by(id_kind=id_kind).first()

    def update(self, update_values: Dict = None) -> Union[None, str]:
        if update_values is None:
            return
        for key in update_values.keys():
            setattr(self, key, update_values[key])
        return self.save_to_db()

    def save_to_db(self) -> Union[None, str]:
        try:
            dbs_global.session.add(self)
            dbs_global.session.commit()
        except InvalidRequestError as error:
            dbs_global.session.rollback()
            return (
                "component.models.ComponentKindModel.save_to_db InvalidRequestError:"
                f"\n{error}")

        except Exception as error:
            dbs_global.session.rollback()
            return (
                "component.models.ComponentKindModel.save_to_db SomeError:"
                f"\n{error}")

    def delete_fm_db(self) -> None:
        try:
            dbs_global.session.delete(self)
            dbs_global.session.commit()
        except Exception as error:
            print('components.models.ComponentKindModel.delete_fm_db error\n', error)
