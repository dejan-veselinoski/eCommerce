export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Money: any;
  Upload: any;
};

export type Facet = Node & {
  __typename?: 'Facet';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  any: any;
  name: Scalars['String'];
  translations: Array<any>;
  updatedAt: Scalars['DateTime'];
  values: Array<FacetValue>;
};

export type FacetFilterParameter = {
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  any?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type FacetList = PaginatedList & {
  __typename?: 'FacetList';
  items: Array<Facet>;
  totalItems: Scalars['Int'];
};

export enum LogicalOperator {
  AND = 'AND',
  OR = 'OR'
}

export type FacetListOptions = {
  filter?: InputMaybe<FacetFilterParameter>;
  filterOperator?: InputMaybe<LogicalOperator>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<FacetSortParameter>;
  take?: InputMaybe<Scalars['Int']>;
};

export type FacetSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FacetValue = Node & {
  __typename?: 'FacetValue';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  facet: Facet;
  id: Scalars['ID'];
  any: any;
  name: Scalars['String'];
  translations: Array<any>;
  updatedAt: Scalars['DateTime'];
};

export enum AssetType {
  BINARY = 'BINARY',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export type Asset = Node & {
  __typename?: 'Asset';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  fileSize: Scalars['Int'];
  focalPoint?: Maybe<Coordinate>;
  height: Scalars['Int'];
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  name: Scalars['String'];
  preview: Scalars['String'];
  source: Scalars['String'];
  tags: Array<any>;
  type: AssetType;
  updatedAt: Scalars['DateTime'];
  width: Scalars['Int'];
};

export type Collection = Node & {
  __typename?: 'Collection';
  assets: Array<Asset>;
  breadcrumbs: Array<CollectionBreadcrumb>;
  children?: Maybe<Array<Collection>>;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  description: Scalars['String'];
  featuredAsset?: Maybe<Asset>;
  filters: Array<ConfigurableOperation>;
  id: Scalars['ID'];
  any?: Maybe<any>;
  name: Scalars['String'];
  parent?: Maybe<Collection>;
  parentId: Scalars['ID'];
  position: Scalars['Int'];
  productVariants: ProductVariantList;
  slug: Scalars['String'];
  translations: Array<any>;
  updatedAt: Scalars['DateTime'];
};


export type CollectionProductVariantsArgs = {
  options?: InputMaybe<ProductVariantListOptions>;
};

export type CollectionBreadcrumb = {
  __typename?: 'CollectionBreadcrumb';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type StringOperators = {
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  notContains?: InputMaybe<Scalars['String']>;
  notEq?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  regex?: InputMaybe<Scalars['String']>;
};


export type CollectionFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  any?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  parentId?: InputMaybe<IdOperators>;
  position?: InputMaybe<NumberOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type CollectionList = PaginatedList & {
  __typename?: 'CollectionList';
  items: Array<Collection>;
  totalItems: Scalars['Int'];
};

export type CollectionListOptions = {
  filter?: InputMaybe<CollectionFilterParameter>;
  filterOperator?: InputMaybe<LogicalOperator>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<CollectionSortParameter>;
  take?: InputMaybe<Scalars['Int']>;
  topLevelOnly?: InputMaybe<Scalars['Boolean']>;
};

export type CollectionResult = {
  __typename?: 'CollectionResult';
  collection: Collection;
  count: Scalars['Int'];
};

export type CollectionSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  parentId?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ConfigArg = {
  __typename?: 'ConfigArg';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ConfigArgDefinition = {
  __typename?: 'ConfigArgDefinition';
  defaultValue?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  required: Scalars['Boolean'];
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type ConfigArgInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ConfigurableOperation = {
  __typename?: 'ConfigurableOperation';
  args: Array<ConfigArg>;
  code: Scalars['String'];
};

export type ConfigurableOperationDefinition = {
  __typename?: 'ConfigurableOperationDefinition';
  args: Array<ConfigArgDefinition>;
  code: Scalars['String'];
  description: Scalars['String'];
};

export type ConfigurableOperationInput = {
  arguments: Array<ConfigArgInput>;
  code: Scalars['String'];
};

export type Coordinate = {
  __typename?: 'Coordinate';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type DateOperators = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  between?: InputMaybe<DateRange>;
  eq?: InputMaybe<Scalars['DateTime']>;
  isNull?: InputMaybe<Scalars['Boolean']>;
};

export type DateRange = {
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
};

export type IdListOperators = {
  inList: Scalars['ID'];
};

export type IdOperators = {
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  notEq?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToOrder: UpdateOrderItemsResult;
  adjustOrderLine: UpdateOrderItemsResult;
  removeAllOrderLines: RemoveOrderItemsResult;
  removeOrderLine: RemoveOrderItemsResult;
};

export type MutationAddItemToOrderArgs = {
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type MutationAdjustOrderLineArgs = {
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type MutationRemoveOrderLineArgs = {
  orderLineId: Scalars['ID'];
};

export type NativeAuthInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type NumberListOperators = {
  inList: Scalars['Float'];
};

export type NumberOperators = {
  between?: InputMaybe<NumberRange>;
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
};

export type NumberRange = {
  end: Scalars['Float'];
  start: Scalars['Float'];
};

export type Order = Node & {
  __typename?: 'Order';
  active: Scalars['Boolean'];
  billingAddress?: Maybe<any>;
  code: Scalars['String'];
  couponCodes: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  currencyCode: any;
  customFields?: Maybe<Scalars['JSON']>;
  customer?: Maybe<any>;
  discounts: Array<any>;
  fulfillments?: Maybe<Array<any>>;
  history: any;
  id: Scalars['ID'];
  lines: Array<OrderLine>;
  orderPlacedAt?: Maybe<Scalars['DateTime']>;
  payments?: Maybe<Array<any>>;
  promotions: Array<Promotion>;
  shipping: Scalars['Money'];
  shippingAddress?: Maybe<any>;
  shippingLines: Array<any>;
  shippingWithTax: Scalars['Money'];
  state: Scalars['String'];
  subTotal: Scalars['Money'];
  subTotalWithTax: Scalars['Money'];
  surcharges: Array<Surcharge>;
  taxSummary: Array<OrderTaxSummary>;
  total: Scalars['Money'];
  totalQuantity: Scalars['Int'];
  totalWithTax: Scalars['Money'];
  type: OrderType;
  updatedAt: Scalars['DateTime'];
};

export type OrderHistoryArgs = {
  options?: InputMaybe<any>;
};

export type OrderFilterParameter = {
  active?: InputMaybe<any>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  currencyCode?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  orderPlacedAt?: InputMaybe<DateOperators>;
  shipping?: InputMaybe<NumberOperators>;
  shippingWithTax?: InputMaybe<NumberOperators>;
  state?: InputMaybe<StringOperators>;
  subTotal?: InputMaybe<NumberOperators>;
  subTotalWithTax?: InputMaybe<NumberOperators>;
  total?: InputMaybe<NumberOperators>;
  totalQuantity?: InputMaybe<NumberOperators>;
  totalWithTax?: InputMaybe<NumberOperators>;
  type?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type OrderLine = Node & {
  __typename?: 'OrderLine';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  discountedLinePrice: Scalars['Money'];
  discountedLinePriceWithTax: Scalars['Money'];
  discountedUnitPrice: Scalars['Money'];
  discountedUnitPriceWithTax: Scalars['Money'];
  discounts: Array<any>;
  featuredAsset?: Maybe<Asset>;
  fulfillmentLines?: Maybe<Array<any>>;
  id: Scalars['ID'];
  linePrice: Scalars['Money'];
  linePriceWithTax: Scalars['Money'];
  lineTax: Scalars['Money'];
  order: Order;
  orderPlacedQuantity: Scalars['Int'];
  productVariant: ProductVariant;
  proratedLinePrice: Scalars['Money'];
  proratedLinePriceWithTax: Scalars['Money'];
  proratedUnitPrice: Scalars['Money'];
  proratedUnitPriceWithTax: Scalars['Money'];
  quantity: Scalars['Int'];
  taxLines: Array<TaxLine>;
  taxRate: Scalars['Float'];
  unitPrice: Scalars['Money'];
  unitPriceChangeSinceAdded: Scalars['Money'];
  unitPriceWithTax: Scalars['Money'];
  unitPriceWithTaxChangeSinceAdded: Scalars['Money'];
  updatedAt: Scalars['DateTime'];
};

export type OrderList = PaginatedList & {
  __typename?: 'OrderList';
  items: Array<Order>;
  totalItems: Scalars['Int'];
};

export type OrderListOptions = {
  filter?: InputMaybe<OrderFilterParameter>;
  filterOperator?: InputMaybe<LogicalOperator>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<OrderSortParameter>;
  take?: InputMaybe<Scalars['Int']>;
};

export type OrderSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  orderPlacedAt?: InputMaybe<SortOrder>;
  shipping?: InputMaybe<SortOrder>;
  shippingWithTax?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  subTotal?: InputMaybe<SortOrder>;
  subTotalWithTax?: InputMaybe<SortOrder>;
  total?: InputMaybe<SortOrder>;
  totalQuantity?: InputMaybe<SortOrder>;
  totalWithTax?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type OrderTaxSummary = {
  __typename?: 'OrderTaxSummary';
  description: Scalars['String'];
  taxBase: Scalars['Money'];
  taxRate: Scalars['Float'];
  taxTotal: Scalars['Money'];
};

export enum OrderType {
  Aggregate = 'Aggregate',
  Regular = 'Regular',
  Seller = 'Seller'
}

export type PaginatedList = {
  items: Array<Node>;
  totalItems: Scalars['Int'];
};

export type PriceRange = {
  __typename?: 'PriceRange';
  max: Scalars['Money'];
  min: Scalars['Money'];
};

export type Product = Node & {
  __typename?: 'Product';
  assets: Array<Asset>;
  collections: Array<Collection>;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  description: Scalars['String'];
  facetValues: Array<FacetValue>;
  featuredAsset?: Maybe<Asset>;
  id: Scalars['ID'];
  any: any;
  name: Scalars['String'];
  optionGroups: Array<ProductOptionGroup>;
  slug: Scalars['String'];
  translations: Array<any>;
  updatedAt: Scalars['DateTime'];
  variantList: ProductVariantList;
  variants: Array<ProductVariant>;
};

export type ProductVariantListArgs = {
  options?: InputMaybe<ProductVariantListOptions>;
};

export type ProductFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  any?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type ProductList = PaginatedList & {
  __typename?: 'ProductList';
  items: Array<Product>;
  totalItems: Scalars['Int'];
};

export type ProductListOptions = {
  filter?: InputMaybe<ProductFilterParameter>;
  filterOperator?: InputMaybe<LogicalOperator>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<ProductSortParameter>;
  take?: InputMaybe<Scalars['Int']>;
};

export type ProductOption = Node & {
  __typename?: 'ProductOption';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  group: ProductOptionGroup;
  groupId: Scalars['ID'];
  id: Scalars['ID'];
  any: any;
  name: Scalars['String'];
  translations: Array<any>;
  updatedAt: Scalars['DateTime'];
};

export type ProductOptionGroup = Node & {
  __typename?: 'ProductOptionGroup';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  any: any;
  name: Scalars['String'];
  options: Array<ProductOption>;
  translations: Array<ProductOptionGroupTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type ProductOptionGroupTranslation = {
  __typename?: 'ProductOptionGroupTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  any: any;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProductSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum CurrencyCode {
  /** United Arab Emirates dirham */
  AED = 'AED',
  /** Afghan afghani */
  AFN = 'AFN',
  /** Albanian lek */
  ALL = 'ALL',
  /** Armenian dram */
  AMD = 'AMD',
  /** Netherlands Antillean guilder */
  ANG = 'ANG',
  /** Angolan kwanza */
  AOA = 'AOA',
  /** Argentine peso */
  ARS = 'ARS',
  /** Australian dollar */
  AUD = 'AUD',
  /** Aruban florin */
  AWG = 'AWG',
  /** Azerbaijani manat */
  AZN = 'AZN',
  /** Bosnia and Herzegovina convertible mark */
  BAM = 'BAM',
  /** Barbados dollar */
  BBD = 'BBD',
  /** Bangladeshi taka */
  BDT = 'BDT',
  /** Bulgarian lev */
  BGN = 'BGN',
  /** Bahraini dinar */
  BHD = 'BHD',
  /** Burundian franc */
  BIF = 'BIF',
  /** Bermudian dollar */
  BMD = 'BMD',
  /** Brunei dollar */
  BND = 'BND',
  /** Boliviano */
  BOB = 'BOB',
  /** Brazilian real */
  BRL = 'BRL',
  /** Bahamian dollar */
  BSD = 'BSD',
  /** Bhutanese ngultrum */
  BTN = 'BTN',
  /** Botswana pula */
  BWP = 'BWP',
  /** Belarusian ruble */
  BYN = 'BYN',
  /** Belize dollar */
  BZD = 'BZD',
  /** Canadian dollar */
  CAD = 'CAD',
  /** Congolese franc */
  CDF = 'CDF',
  /** Swiss franc */
  CHF = 'CHF',
  /** Chilean peso */
  CLP = 'CLP',
  /** Renminbi (Chinese) yuan */
  CNY = 'CNY',
  /** Colombian peso */
  COP = 'COP',
  /** Costa Rican colon */
  CRC = 'CRC',
  /** Cuban convertible peso */
  CUC = 'CUC',
  /** Cuban peso */
  CUP = 'CUP',
  /** Cape Verde escudo */
  CVE = 'CVE',
  /** Czech koruna */
  CZK = 'CZK',
  /** Djiboutian franc */
  DJF = 'DJF',
  /** Danish krone */
  DKK = 'DKK',
  /** Dominican peso */
  DOP = 'DOP',
  /** Algerian dinar */
  DZD = 'DZD',
  /** Egyptian pound */
  EGP = 'EGP',
  /** Eritrean nakfa */
  ERN = 'ERN',
  /** Ethiopian birr */
  ETB = 'ETB',
  /** Euro */
  EUR = 'EUR',
  /** Fiji dollar */
  FJD = 'FJD',
  /** Falkland Islands pound */
  FKP = 'FKP',
  /** Pound sterling */
  GBP = 'GBP',
  /** Georgian lari */
  GEL = 'GEL',
  /** Ghanaian cedi */
  GHS = 'GHS',
  /** Gibraltar pound */
  GIP = 'GIP',
  /** Gambian dalasi */
  GMD = 'GMD',
  /** Guinean franc */
  GNF = 'GNF',
  /** Guatemalan quetzal */
  GTQ = 'GTQ',
  /** Guyanese dollar */
  GYD = 'GYD',
  /** Hong Kong dollar */
  HKD = 'HKD',
  /** Honduran lempira */
  HNL = 'HNL',
  /** Croatian kuna */
  HRK = 'HRK',
  /** Haitian gourde */
  HTG = 'HTG',
  /** Hungarian forint */
  HUF = 'HUF',
  /** Indonesian rupiah */
  IDR = 'IDR',
  /** Israeli new shekel */
  ILS = 'ILS',
  /** Indian rupee */
  INR = 'INR',
  /** Iraqi dinar */
  IQD = 'IQD',
  /** Iranian rial */
  IRR = 'IRR',
  /** Icelandic króna */
  ISK = 'ISK',
  /** Jamaican dollar */
  JMD = 'JMD',
  /** Jordanian dinar */
  JOD = 'JOD',
  /** Japanese yen */
  JPY = 'JPY',
  /** Kenyan shilling */
  KES = 'KES',
  /** Kyrgyzstani som */
  KGS = 'KGS',
  /** Cambodian riel */
  KHR = 'KHR',
  /** Comoro franc */
  KMF = 'KMF',
  /** North Korean won */
  KPW = 'KPW',
  /** South Korean won */
  KRW = 'KRW',
  /** Kuwaiti dinar */
  KWD = 'KWD',
  /** Cayman Islands dollar */
  KYD = 'KYD',
  /** Kazakhstani tenge */
  KZT = 'KZT',
  /** Lao kip */
  LAK = 'LAK',
  /** Lebanese pound */
  LBP = 'LBP',
  /** Sri Lankan rupee */
  LKR = 'LKR',
  /** Liberian dollar */
  LRD = 'LRD',
  /** Lesotho loti */
  LSL = 'LSL',
  /** Libyan dinar */
  LYD = 'LYD',
  /** Moroccan dirham */
  MAD = 'MAD',
  /** Moldovan leu */
  MDL = 'MDL',
  /** Malagasy ariary */
  MGA = 'MGA',
  /** Macedonian denar */
  MKD = 'MKD',
  /** Myanmar kyat */
  MMK = 'MMK',
  /** Mongolian tögrög */
  MNT = 'MNT',
  /** Macanese pataca */
  MOP = 'MOP',
  /** Mauritanian ouguiya */
  MRU = 'MRU',
  /** Mauritian rupee */
  MUR = 'MUR',
  /** Maldivian rufiyaa */
  MVR = 'MVR',
  /** Malawian kwacha */
  MWK = 'MWK',
  /** Mexican peso */
  MXN = 'MXN',
  /** Malaysian ringgit */
  MYR = 'MYR',
  /** Mozambican metical */
  MZN = 'MZN',
  /** Namibian dollar */
  NAD = 'NAD',
  /** Nigerian naira */
  NGN = 'NGN',
  /** Nicaraguan córdoba */
  NIO = 'NIO',
  /** Norwegian krone */
  NOK = 'NOK',
  /** Nepalese rupee */
  NPR = 'NPR',
  /** New Zealand dollar */
  NZD = 'NZD',
  /** Omani rial */
  OMR = 'OMR',
  /** Panamanian balboa */
  PAB = 'PAB',
  /** Peruvian sol */
  PEN = 'PEN',
  /** Papua New Guinean kina */
  PGK = 'PGK',
  /** Philippine peso */
  PHP = 'PHP',
  /** Pakistani rupee */
  PKR = 'PKR',
  /** Polish złoty */
  PLN = 'PLN',
  /** Paraguayan guaraní */
  PYG = 'PYG',
  /** Qatari riyal */
  QAR = 'QAR',
  /** Romanian leu */
  RON = 'RON',
  /** Serbian dinar */
  RSD = 'RSD',
  /** Russian ruble */
  RUB = 'RUB',
  /** Rwandan franc */
  RWF = 'RWF',
  /** Saudi riyal */
  SAR = 'SAR',
  /** Solomon Islands dollar */
  SBD = 'SBD',
  /** Seychelles rupee */
  SCR = 'SCR',
  /** Sudanese pound */
  SDG = 'SDG',
  /** Swedish krona/kronor */
  SEK = 'SEK',
  /** Singapore dollar */
  SGD = 'SGD',
  /** Saint Helena pound */
  SHP = 'SHP',
  /** Sierra Leonean leone */
  SLL = 'SLL',
  /** Somali shilling */
  SOS = 'SOS',
  /** Surinamese dollar */
  SRD = 'SRD',
  /** South Sudanese pound */
  SSP = 'SSP',
  /** São Tomé and Príncipe dobra */
  STN = 'STN',
  /** Salvadoran colón */
  SVC = 'SVC',
  /** Syrian pound */
  SYP = 'SYP',
  /** Swazi lilangeni */
  SZL = 'SZL',
  /** Thai baht */
  THB = 'THB',
  /** Tajikistani somoni */
  TJS = 'TJS',
  /** Turkmenistan manat */
  TMT = 'TMT',
  /** Tunisian dinar */
  TND = 'TND',
  /** Tongan paʻanga */
  TOP = 'TOP',
  /** Turkish lira */
  TRY = 'TRY',
  /** Trinidad and Tobago dollar */
  TTD = 'TTD',
  /** New Taiwan dollar */
  TWD = 'TWD',
  /** Tanzanian shilling */
  TZS = 'TZS',
  /** Ukrainian hryvnia */
  UAH = 'UAH',
  /** Ugandan shilling */
  UGX = 'UGX',
  /** United States dollar */
  USD = 'USD',
  /** Uruguayan peso */
  UYU = 'UYU',
  /** Uzbekistan som */
  UZS = 'UZS',
  /** Venezuelan bolívar soberano */
  VES = 'VES',
  /** Vietnamese đồng */
  VND = 'VND',
  /** Vanuatu vatu */
  VUV = 'VUV',
  /** Samoan tala */
  WST = 'WST',
  /** CFA franc BEAC */
  XAF = 'XAF',
  /** East Caribbean dollar */
  XCD = 'XCD',
  /** CFA franc BCEAO */
  XOF = 'XOF',
  /** CFP franc (franc Pacifique) */
  XPF = 'XPF',
  /** Yemeni rial */
  YER = 'YER',
  /** South African rand */
  ZAR = 'ZAR',
  /** Zambian kwacha */
  ZMW = 'ZMW',
  /** Zimbabwean dollar */
  ZWL = 'ZWL'
}

export type ProductVariant = Node & {
  __typename?: 'ProductVariant';
  assets: Array<Asset>;
  createdAt: Scalars['DateTime'];
  currencyCode: CurrencyCode;
  customFields?: Maybe<Scalars['JSON']>;
  facetValues: Array<FacetValue>;
  featuredAsset?: Maybe<Asset>;
  id: Scalars['ID'];
  any: any;
  name: Scalars['String'];
  options: Array<ProductOption>;
  price: Scalars['Money'];
  priceWithTax: Scalars['Money'];
  product: Product;
  productId: Scalars['ID'];
  sku: Scalars['String'];
  stockLevel: Scalars['String'];
  taxCategory: TaxCategory;
  taxRateApplied: TaxRate;
  translations: Array<ProductVariantTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type ProductVariantFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  currencyCode?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  any?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  price?: InputMaybe<NumberOperators>;
  priceWithTax?: InputMaybe<NumberOperators>;
  productId?: InputMaybe<IdOperators>;
  sku?: InputMaybe<StringOperators>;
  stockLevel?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type ProductVariantList = PaginatedList & {
  __typename?: 'ProductVariantList';
  items: Array<ProductVariant>;
  totalItems: Scalars['Int'];
};

export type ProductVariantListOptions = {
  filter?: InputMaybe<ProductVariantFilterParameter>;
  filterOperator?: InputMaybe<LogicalOperator>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<ProductVariantSortParameter>;
  take?: InputMaybe<Scalars['Int']>;
};

export type ProductVariantSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
  priceWithTax?: InputMaybe<SortOrder>;
  productId?: InputMaybe<SortOrder>;
  sku?: InputMaybe<SortOrder>;
  stockLevel?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProductVariantTranslation = {
  __typename?: 'ProductVariantTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  any: any;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Promotion = Node & {
  __typename?: 'Promotion';
  actions: Array<ConfigurableOperation>;
  conditions: Array<ConfigurableOperation>;
  couponCode?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  description: Scalars['String'];
  enabled: Scalars['Boolean'];
  endsAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  perCustomerUsageLimit?: Maybe<Scalars['Int']>;
  startsAt?: Maybe<Scalars['DateTime']>;
  translations: Array<PromotionTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type PromotionList = PaginatedList & {
  __typename?: 'PromotionList';
  items: Array<Promotion>;
  totalItems: Scalars['Int'];
};

export type PromotionTranslation = {
  __typename?: 'PromotionTranslation';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  any: any;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Province = Node & any & {
  __typename?: 'Province';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  any: any;
  name: Scalars['String'];
  parent?: Maybe<any>;
  parentId?: Maybe<Scalars['ID']>;
  translations: Array<any>;
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProvinceList = PaginatedList & {
  __typename?: 'ProvinceList';
  items: Array<Province>;
  totalItems: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  activeChannel: any;
  activeCustomer?: Maybe<any>;
  activeOrder?: Maybe<Order>;
  availableCountries: Array<any>;
  collection?: Maybe<Collection>;
  collections: CollectionList;
  facet?: Maybe<Facet>;
  facets: FacetList;
  me?: Maybe<any>;
  nextOrderStates: Array<Scalars['String']>;
  order?: Maybe<Order>;
  orderByCode?: Maybe<Order>;
  product?: Maybe<Product>;
  products: ProductList;
  search: SearchResponse;
};

export type ErrorResult = {
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type OrderModificationError = ErrorResult & {
  __typename?: 'OrderModificationError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type RemoveOrderItemsResult = Order | OrderModificationError;

export type FacetValueFilterInput = {
  and?: InputMaybe<Scalars['ID']>;
  or?: InputMaybe<Array<Scalars['ID']>>;
};

export type SearchInput = {
  collectionId?: InputMaybe<Scalars['ID']>;
  collectionSlug?: InputMaybe<Scalars['String']>;
  facetValueFilters?: InputMaybe<Array<FacetValueFilterInput>>;
  groupByProduct?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SearchResultSortParameter>;
  take?: InputMaybe<Scalars['Int']>;
  term?: InputMaybe<Scalars['String']>;
};

export type SearchReindexResponse = {
  __typename?: 'SearchReindexResponse';
  success: Scalars['Boolean'];
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  collections: Array<CollectionResult>;
  facetValues: Array<FacetValueResult>;
  items: Array<SearchResult>;
  totalItems: Scalars['Int'];
};

export type FacetValueResult = {
  __typename?: 'FacetValueResult';
  count: Scalars['Int'];
  facetValue: FacetValue;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  collectionIds: Array<Scalars['ID']>;
  currencyCode: CurrencyCode;
  description: Scalars['String'];
  facetIds: Array<Scalars['ID']>;
  facetValueIds: Array<Scalars['ID']>;
  price: SearchResultPrice;
  priceWithTax: SearchResultPrice;
  productAsset?: Maybe<SearchResultAsset>;
  productId: Scalars['ID'];
  productName: Scalars['String'];
  productVariantAsset?: Maybe<SearchResultAsset>;
  productVariantId: Scalars['ID'];
  productVariantName: Scalars['String'];
  score: Scalars['Float'];
  sku: Scalars['String'];
  slug: Scalars['String'];
};

export type SearchResultAsset = {
  __typename?: 'SearchResultAsset';
  focalPoint?: Maybe<Coordinate>;
  id: Scalars['ID'];
  preview: Scalars['String'];
};

export type SearchResultPrice = PriceRange | SinglePrice;

export type SearchResultSortParameter = {
  name?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
};

export type Seller = Node & {
  __typename?: 'Seller';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SinglePrice = {
  __typename?: 'SinglePrice';
  value: Scalars['Money'];
};

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean'];
};

export type Surcharge = Node & {
  __typename?: 'Surcharge';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  price: Scalars['Money'];
  priceWithTax: Scalars['Money'];
  sku?: Maybe<Scalars['String']>;
  taxLines: Array<TaxLine>;
  taxRate: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type TaxCategory = Node & {
  __typename?: 'TaxCategory';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TaxLine = {
  __typename?: 'TaxLine';
  description: Scalars['String'];
  taxRate: Scalars['Float'];
};

export type TaxRate = Node & {
  __typename?: 'TaxRate';
  category: TaxCategory;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  customerGroup?: Maybe<any>;
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['Float'];
  zone: any;
};

export type UpdateOrderItemsResult = Order | any | OrderModificationError;

export type GetCollectionsQueryVariables = Exact<{
  options?: InputMaybe<CollectionListOptions>;
}>;

export type GetActiveChannelQuery = { __typename?: 'Query', activeChannel: { __typename?: 'Channel', id: string, code: string, currencyCode: CurrencyCode, defaultLanguageCode: any } };

export type GetOrderForCheckoutQuery = { __typename?: 'Query', activeOrder?: { __typename?: 'Order', id: string, code: string, state: string, active: boolean, updatedAt: any, orderPlacedAt?: any, totalQuantity: number, subTotal: any, subTotalWithTax: any, total: any, totalWithTax: any, shipping: any, shippingWithTax: any, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string, company?: string, streetLine1?: string, streetLine2?: string, city?: string, province?: string, postalCode?: string, country?: string, phoneNumber?: string }, lines: Array<{ __typename?: 'OrderLine', id: string, unitPrice: any, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, discountedLinePriceWithTax: any, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } }, productVariant: { __typename?: 'ProductVariant', id: string, name: string }, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> }>, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: any, shippingMethod: { __typename?: 'ShippingMethod', id: string, code: string, name: string, description: string } }>, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> } };

export type GetCollectionsQuery = { __typename?: 'Query', collections: { __typename?: 'CollectionList', items: Array<{ __typename?: 'Collection', id: string, name: string, slug: string, parent?: { __typename?: 'Collection', id: string, name: string, slug: string }, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } } }> } };

export type AssetFragment = { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } };

export type RemoveItemFromCartMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type RemoveItemFromCartMutation = { __typename?: 'Mutation', removeOrderLine: { __typename?: 'Order', id: string, code: string, state: string, active: boolean, updatedAt: any, orderPlacedAt?: any, totalQuantity: number, subTotal: any, subTotalWithTax: any, total: any, totalWithTax: any, shipping: any, shippingWithTax: any, lines: Array<{ __typename?: 'OrderLine', id: string, unitPrice: any, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, discountedLinePriceWithTax: any, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } }, productVariant: { __typename?: 'ProductVariant', id: string, name: string }, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> }>, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: any, shippingMethod: { __typename?: 'ShippingMethod', id: string, code: string, name: string, description: string } }>, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> } | { __typename?: 'OrderModificationError', errorCode: ErrorCode, message: string } };

export type GetCartTotalsQuery = { __typename?: 'Query', activeOrder?: { __typename?: 'Order', id: string, active: boolean, totalQuantity: number, totalWithTax: any } };

export type GetProductDetailQueryVariables = Exact<{
  slug: Scalars['String'];
}>;

export type GetProductDetailQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, description: string, variants: Array<{ __typename?: 'ProductVariant', id: string, name: string, price: any, priceWithTax: any, sku: string, options: Array<{ __typename?: 'ProductOption', code: string, name: string }> }>, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } }, assets: Array<{ __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } }>, collections: Array<{ __typename?: 'Collection', id: string, slug: string, breadcrumbs: Array<{ __typename?: 'CollectionBreadcrumb', id: string, name: string, slug: string }> }> } };

export type AddToCartMutationVariables = Exact<{
  variantId: Scalars['ID'];
  qty: Scalars['Int'];
}>;

export type AddToCartMutation = { __typename?: 'Mutation', addItemToOrder: { __typename?: 'InsufficientStockError', errorCode: ErrorCode, message: string, order: { __typename?: 'Order', id: string, code: string, state: string, active: boolean, updatedAt: any, orderPlacedAt?: any, totalQuantity: number, subTotal: any, subTotalWithTax: any, total: any, totalWithTax: any, shipping: any, shippingWithTax: any, lines: Array<{ __typename?: 'OrderLine', id: string, unitPrice: any, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, discountedLinePriceWithTax: any, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } }, productVariant: { __typename?: 'ProductVariant', id: string, name: string }, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> }>, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: any, shippingMethod: { __typename?: 'ShippingMethod', id: string, code: string, name: string, description: string } }>, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> } } | { __typename?: 'NegativeQuantityError', errorCode: ErrorCode, message: string } | { __typename?: 'Order', id: string, code: string, state: string, active: boolean, updatedAt: any, orderPlacedAt?: any, totalQuantity: number, subTotal: any, subTotalWithTax: any, total: any, totalWithTax: any, shipping: any, shippingWithTax: any, lines: Array<{ __typename?: 'OrderLine', id: string, unitPrice: any, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, discountedLinePriceWithTax: any, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } }, productVariant: { __typename?: 'ProductVariant', id: string, name: string }, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> }>, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: any, shippingMethod: { __typename?: 'ShippingMethod', id: string, code: string, name: string, description: string } }>, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> } | { __typename?: 'OrderLimitError', errorCode: ErrorCode, message: string } | { __typename?: 'OrderModificationError', errorCode: ErrorCode, message: string } };

export type SearchProductsQueryVariables = Exact<{
  input: SearchInput;
}>;

export type SearchProductsQuery = { __typename?: 'Query', search: { __typename?: 'SearchResponse', totalItems: number, items: Array<{ __typename?: 'SearchResult', productId: string, slug: string, productName: string, description: string, priceWithTax: { __typename?: 'PriceRange', min: any, max: any } | { __typename?: 'SinglePrice' }, productAsset?: { __typename?: 'SearchResultAsset', id: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } } }>, facetValues: Array<{ __typename?: 'FacetValueResult', count: number, facetValue: { __typename?: 'FacetValue', id: string, name: string, facet: { __typename?: 'Facet', id: string, name: string } } }> } };

export type GetCollectionQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
}>;

export type GetCollectionQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', id: string, name: string, slug: string, description: string, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } }, breadcrumbs: Array<{ __typename?: 'CollectionBreadcrumb', id: string, slug: string, name: string }>, children?: Array<{ __typename?: 'Collection', id: string, slug: string, name: string, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } } }> } };

export type GetActiveOrderQuery = { __typename?: 'Query', activeOrder?: { __typename?: 'Order', id: string, code: string, state: string, active: boolean, updatedAt: any, orderPlacedAt?: any, totalQuantity: number, subTotal: any, subTotalWithTax: any, total: any, totalWithTax: any, shipping: any, shippingWithTax: any, lines: Array<{ __typename?: 'OrderLine', id: string, unitPrice: any, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, discountedLinePriceWithTax: any, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } }, productVariant: { __typename?: 'ProductVariant', id: string, name: string }, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> }>, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: any, shippingMethod: { __typename?: 'ShippingMethod', id: string, code: string, name: string, description: string } }>, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> } };

export type CartFragment = { __typename?: 'Order', id: string, code: string, state: string, active: boolean, updatedAt: any, orderPlacedAt?: any, totalQuantity: number, subTotal: any, subTotalWithTax: any, total: any, totalWithTax: any, shipping: any, shippingWithTax: any, lines: Array<{ __typename?: 'OrderLine', id: string, unitPrice: any, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, discountedLinePriceWithTax: any, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } }, productVariant: { __typename?: 'ProductVariant', id: string, name: string }, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> }>, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: any, shippingMethod: { __typename?: 'ShippingMethod', id: string, code: string, name: string, description: string } }>, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> };

export type AdjustItemQuantityMutationVariables = Exact<{
  id: Scalars['ID'];
  qty: Scalars['Int'];
}>;

export type AdjustItemQuantityMutation = { __typename?: 'Mutation', adjustOrderLine: { __typename?: 'InsufficientStockError', errorCode: ErrorCode, message: string } | { __typename?: 'NegativeQuantityError', errorCode: ErrorCode, message: string } | { __typename?: 'Order', id: string, code: string, state: string, active: boolean, updatedAt: any, orderPlacedAt?: any, totalQuantity: number, subTotal: any, subTotalWithTax: any, total: any, totalWithTax: any, shipping: any, shippingWithTax: any, lines: Array<{ __typename?: 'OrderLine', id: string, unitPrice: any, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, discountedLinePriceWithTax: any, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } }, productVariant: { __typename?: 'ProductVariant', id: string, name: string }, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> }>, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: any, shippingMethod: { __typename?: 'ShippingMethod', id: string, code: string, name: string, description: string } }>, discounts: Array<{ __typename?: 'Discount', amount: any, amountWithTax: any, description: string, adjustmentSource: string, type: any }> } | { __typename?: 'OrderLimitError', errorCode: ErrorCode, message: string } | { __typename?: 'OrderModificationError', errorCode: ErrorCode, message: string } };


export enum ErrorCode {
  NATIVE_AUTH_STRATEGY_ERROR = 'NATIVE_AUTH_STRATEGY_ERROR',
  NEGATIVE_QUANTITY_ERROR = 'NEGATIVE_QUANTITY_ERROR',
  NO_ACTIVE_ORDER_ERROR = 'NO_ACTIVE_ORDER_ERROR',
  ORDER_LIMIT_ERROR = 'ORDER_LIMIT_ERROR',
  ORDER_MODIFICATION_ERROR = 'ORDER_MODIFICATION_ERROR',
  ORDER_PAYMENT_STATE_ERROR = 'ORDER_PAYMENT_STATE_ERROR',
  ORDER_STATE_TRANSITION_ERROR = 'ORDER_STATE_TRANSITION_ERROR',
}
