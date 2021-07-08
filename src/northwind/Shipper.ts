/*
      <EntityType Name="Shipper">
        <Key>
          <PropertyRef Name="ShipperID" />
        </Key>
        <Property Name="ShipperID" Type="Edm.Int32" Nullable="false" />
        <Property Name="CompanyName" Type="Edm.String" />
        <Property Name="Phone" Type="Edm.String" />
        <NavigationProperty Name="Orders" Type="Collection(kendo_northwind_pg.Models.Order)" />
      </EntityType>
*/


import { Edm, IncKeyProperty, ODataModel, ODataNavigation, Property, withEntitySetName } from '@odata/server';
import { Order } from './Order';

@withEntitySetName('Shippers')
@ODataModel({ name: 'Shippers' })
export class Shipper {

  @IncKeyProperty()
  @Edm.Int32
  ShipperID: number;

  @Property()
  @Edm.String
  CompanyName: string;

  @Property()
  @Edm.String
  Phone: string;

  @ODataNavigation({ type: 'OneToMany', entity: () => Order, targetForeignKey: 'ShipName' })
  Orders: Order[];
}
