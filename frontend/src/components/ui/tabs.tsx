"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

/* -------------------- Types -------------------- */
type TabsValue = string

interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  value?: TabsValue
  defaultValue?: TabsValue
  onValueChange?: (value: TabsValue) => void
  children?: React.ReactNode
}

/* -------------------- Tabs Root -------------------- */
const Tabs = ({ className, children, ...props }: TabsProps) => (
  <TabsPrimitive.Root className={cn(className)} {...props}>
    {children}
  </TabsPrimitive.Root>
)
Tabs.displayName = "Tabs"

/* -------------------- Tabs List -------------------- */
interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  children?: React.ReactNode;
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-12 items-center justify-center rounded-xl bg-slate-200/70 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/70 dark:border-slate-700/50 px-2",
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.List>
))
TabsList.displayName = TabsPrimitive.List.displayName

/* -------------------- Tabs Trigger -------------------- */
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  value: TabsValue
  children?: React.ReactNode
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ className, children, ...props }) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all",
      "data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow",
      "dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-white",
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
)
TabsTrigger.displayName = "TabsTrigger"

/* -------------------- Tabs Content -------------------- */
interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  value: TabsValue
  children?: React.ReactNode
}

const TabsContent: React.FC<TabsContentProps> = ({ className, children, ...props }) => (
  <TabsPrimitive.Content
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Content>
)
TabsContent.displayName = "TabsContent"

/* -------------------- Export -------------------- */
export { Tabs, TabsList, TabsTrigger, TabsContent }
