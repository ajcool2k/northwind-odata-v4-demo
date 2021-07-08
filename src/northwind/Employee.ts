/*
<EntityType Name="Employee">
    <Key>
        <PropertyRef Name="EmployeeID" />
    </Key>
    <Property Name="EmployeeID" Type="Edm.Int32" />
    <Property Name="LastName" Type="Edm.String" />
    <Property Name="FirstName" Type="Edm.String" />
    <Property Name="Title" Type="Edm.String" />
    <Property Name="TitleOfCourtesy" Type="Edm.String" />
    <Property Name="BirthDate" Type="Edm.DateTimeOffset" />
    <Property Name="HireDate" Type="Edm.DateTimeOffset" />
    <Property Name="Address" Type="Edm.String" />
    <Property Name="City" Type="Edm.String" />
    <Property Name="Region" Type="Edm.String" />
    <Property Name="PostalCode" Type="Edm.String" />
    <Property Name="Country" Type="Edm.String" />
    <Property Name="HomePhone" Type="Edm.String" />
    <Property Name="Extension" Type="Edm.String" />
    <Property Name="Notes" Type="Edm.String" />
    <Property Name="ReportsTo" Type="Edm.Int32" />
    <Property Name="PhotoPath" Type="Edm.String" />
    <Property Name="hasChildren" Type="Edm.Boolean" Nullable="false" />
    <NavigationProperty Name="Subordinates" Type="Collection(kendo_northwind_pg.Models.Employee)" />
    <NavigationProperty Name="Employee1" Type="kendo_northwind_pg.Models.Employee">
        <ReferentialConstraint Property="EmployeeID" ReferencedProperty="EmployeeID" />
    </NavigationProperty>
    <NavigationProperty Name="Orders" Type="Collection(kendo_northwind_pg.Models.Order)" />
    <NavigationProperty Name="Territories" Type="Collection(kendo_northwind_pg.Models.Territory)" />
</EntityType>
*/


import { Edm, IncKeyProperty, ODataModel, ODataNavigation, Property, withEntitySetName } from '@odata/server';
import { Order } from './Order';
import { Territory } from './Territory';

@withEntitySetName('Employees')
@ODataModel({ name: 'Employees' })
export class Employee {

  @IncKeyProperty()
  @Edm.Int32
  EmployeeID: number;

  @Property()
  @Edm.String
  LastName: string;

  @Property()
  @Edm.String
  FirstName: string;

  @Property()
  @Edm.String
  Title: string;

  @Property()
  @Edm.String
  TitleOfCourtesy: string;

  @Property()
  @Edm.DateTimeOffset
  BirthDate: Date;

  @Property()
  @Edm.DateTimeOffset
  HireDate: Date;

  @Property()
  @Edm.String
  Address: string;

  @Property()
  @Edm.String
  City: string;

  @Property()
  @Edm.String
  Region: string;

  @Property()
  @Edm.String
  PostalCode: string;

  @Property()
  @Edm.String
  Country: string;

  @Property()
  @Edm.String
  HomePhone: string;

  @Property()
  @Edm.String
  Extension: string;

  @Property()
  @Edm.String
  Notes: string;

  @Property()
  @Edm.Int32
  ReportsTo: number;

  @Property()
  @Edm.String
  PhotoPath: string;

  @Edm.Computed
  @Edm.Boolean
  get hasChildren(): boolean { return false; }

  @ODataNavigation({ type: 'OneToMany', entity: () => Employee, targetForeignKey: 'EmployeeID' })
  Subordinates: Employee[];

  @ODataNavigation({ type: 'OneToMany', entity: () => Order, targetForeignKey: 'EmployeeID' })
  Orders: Order[];

  @ODataNavigation({ type: 'OneToMany', entity: () => Territory, targetForeignKey: 'TerritoryID' })
  Territories: Territory[];
}
