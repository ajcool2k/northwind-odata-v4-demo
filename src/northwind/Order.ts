/*
<EntityType Name="Order">
        <Key>
          <PropertyRef Name="OrderID" />
        </Key>
        <Property Name="OrderID" Type="Edm.Int32" Nullable="false" />
        <Property Name="CustomerID" Type="Edm.String" />
        <Property Name="EmployeeID" Type="Edm.Int32" />
        <Property Name="OrderDate" Type="Edm.DateTimeOffset" />
        <Property Name="RequiredDate" Type="Edm.DateTimeOffset" />
        <Property Name="ShippedDate" Type="Edm.DateTimeOffset" />
        <Property Name="ShipVia" Type="Edm.Int32" />
        <Property Name="Freight" Type="Edm.Decimal" />
        <Property Name="ShipName" Type="Edm.String" />
        <Property Name="ShipAddress" Type="Edm.String" />
        <Property Name="ShipCity" Type="Edm.String" />
        <Property Name="ShipRegion" Type="Edm.String" />
        <Property Name="ShipPostalCode" Type="Edm.String" />
        <Property Name="ShipCountry" Type="Edm.String" />
        <Property Name="Order_Details" Type="Collection(kendo_northwind_pg.Models.Order_Detail)" />
        <NavigationProperty Name="Customer" Type="kendo_northwind_pg.Models.Customer">
          <ReferentialConstraint Property="CustomerID" ReferencedProperty="CustomerID" />
        </NavigationProperty>
        <NavigationProperty Name="Employee" Type="kendo_northwind_pg.Models.Employee">
          <ReferentialConstraint Property="EmployeeID" ReferencedProperty="EmployeeID" />
        </NavigationProperty>
        <NavigationProperty Name="Shipper" Type="kendo_northwind_pg.Models.Shipper" />
      </EntityType>
*/

import { BigNumber, Collection, Edm, ForeignKey, IncKeyProperty, ODataModel, ODataNavigation, Property, withEntitySetName } from '@odata/server';
import { Customer } from './Customer';
import { Employee } from './Employee';
import { Order_Detail } from './OrderDetail';
import { Shipper } from './Shipper';

@withEntitySetName('Orders')
@ODataModel({ name: 'Orders' })
export class Order {

  @IncKeyProperty()
  @Edm.Int32
  OrderID: number;

  @Property()
  @ForeignKey()
  @Edm.String
  CustomerID: string;

  @Property()
  @ForeignKey()
  @Edm.Int32
  EmployeeID: number;

  @Property()
  @Edm.DateTimeOffset
  OrderDate: Date;

  @Property()
  @Edm.DateTimeOffset
  RequiredDate: Date;

  @Property()
  @Edm.DateTimeOffset
  ShippedDate: Date;

  @Property()
  @Edm.Int32
  ShipVia: number;

  @Property({ type: "numeric" })
  @Edm.Decimal
  Freight: BigNumber;

  @Property()
  @Edm.String
  ShipName: string;

  @Property()
  @Edm.String
  ShipAddress: string;

  @Property()
  @Edm.String
  ShipCity: string;

  @Property()
  @Edm.String
  ShipRegion: string;

  @Property()
  @Edm.String
  ShipPostalCode: string;

  @Property()
  @Edm.String
  ShipCountry: string;

  @Collection(Edm.ComplexType(Order_Detail))
  Order_Details: Order_Detail[];

  @ODataNavigation({ type: 'OneToOne', entity: () => Customer, foreignKey: 'CustomerID' })
  Customer: Customer

  @ODataNavigation({ type: 'OneToOne', entity: () => Employee, foreignKey: 'EmployeeID' })
  Employee: Employee

  @ODataNavigation({ type: 'ManyToOne', entity: () => Shipper, foreignKey: 'ShipName' })
  Shipper: Shipper
}
